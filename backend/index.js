import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.type("text/plain").send("FinTrust backend is running. Use POST /chat.");
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/chat", async (req, res) => {
  const message = typeof req?.body?.message === "string" ? req.body.message.trim() : "";
  const creditData = req?.body?.creditData;
  if (!creditData || typeof creditData !== "object") {
    return res.status(400).json({ error: "Missing creditData" });
  }

  let ml;
  try {
    ml = await axios.post(
      process.env.ML_URL ?? "http://127.0.0.1:8000/score",
      creditData
    );
  } catch {
    return res.status(502).json({ error: "ML service unavailable" });
  }

  const prompt = `You are FinTrust AI, a helpful fintech assistant.

User question: ${message || "(no question provided)"}

Credit Score: ${ml.data.credit_score}
Risk Level: ${ml.data.risk_level}

Answer the user's question using the credit score and risk level as context. Be clear and practical. If the user asks something unrelated, answer normally but you can still reference the score/risk briefly.`;

  try {
    const llm = await axios.post(
      process.env.OLLAMA_URL ?? "http://127.0.0.1:11434/api/generate",
      {
        model: process.env.OLLAMA_MODEL ?? "llama3.2:latest",
        prompt,
        stream: false,
      }
    );

    const responseText = typeof llm?.data?.response === "string" ? llm.data.response : "";
    return res.json({ explanation: responseText || "(Empty response from LLM)" });
  } catch {
    return res.json({
      explanation: `${prompt}\n\n(LLM unavailable; start Ollama on :11434 to enable chat responses.)`,
    });
  }
});

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "127.0.0.1";

app.listen(port, host, () => console.log(`Backend running on http://${host}:${port}`));
