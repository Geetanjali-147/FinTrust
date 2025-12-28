const chatIcon = document.getElementById("chat-icon");
const chatBox = document.getElementById("chat-box");
const messages = document.getElementById("chat-messages");

chatIcon.onclick = () => {
  chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
};

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value;
  if (!text) return;

  messages.innerHTML += `<div><b>You:</b> ${text}</div>`;
  input.value = "";

  try {
    const res = await fetch("http://127.0.0.1:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        creditData: {
          duration: 24,
          credit_amount: 5000,
          installment_rate: 2,
          residence_since: 2,
          age: 30,
          existing_credits: 1,
          people_liable: 1,
          credit_history: "A34",
          purpose: "A43",
          savings: "A65",
          employment: "A75",
          property: "A121",
          job: "A173",
          telephone: "A192",
        },
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || `Request failed (${res.status})`;
      messages.innerHTML += `<div><b>FinTrust:</b> ${msg}</div>`;
      return;
    }

    const reply = data?.explanation || data?.error || "(No response)";
    messages.innerHTML += `<div><b>FinTrust:</b> ${reply}</div>`;
  } catch (e) {
    messages.innerHTML += `<div><b>FinTrust:</b> Network error talking to backend</div>`;
  }
}
