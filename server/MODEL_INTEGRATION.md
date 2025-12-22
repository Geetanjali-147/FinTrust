# 📦 Credit Risk Inference with `fintrust_credit_model.onnx`

**Production Integration Guide (Node.js / Express)**

This document describes how to load and run inference using the **ONNX credit risk model** in a production Express backend.

---

## 1️⃣ Runtime Requirements

### Platform

* **Node.js ≥ 18**
* **Express ≥ 4**

### Dependency

Install ONNX Runtime for Node.js:

```bash
npm install onnxruntime-node
```

---

## 2️⃣ Model Summary

* **Model**: GradientBoostingClassifier (scikit-learn)
* **Format**: ONNX
* **Includes preprocessing**:

  * Missing value imputation
  * One-hot encoding for categorical features
* **Task**: Binary classification

### Output semantics (can differ)

| Class | Meaning          |
| ----- | ---------------- |
| `1` | Creditworthy     |
| `0` | Not creditworthy |

* Output probabilities are ordered as:

  ```
  [class_0_probability, class_1_probability]
  ```

---

## 3️⃣ Loading the Model (Startup Only)

The ONNX model **must be loaded once at server startup**, not per request.

```js
const ort = require("onnxruntime-node");

let session;

async function loadModel() {
  session = await ort.InferenceSession.create(
    "./fintrust_credit_model.onnx"
  );
  console.log("ONNX model loaded successfully");
}

loadModel();
```

> ⚠️ Do not reload the model inside request handlers.

---

## 4️⃣ Expected Input Contract

### Request body (JSON)

All fields are **required**.
Field names **must match exactly**.

```json
{
  "status": "A11",
  "duration": 24,
  "credit_history": "A34",
  "purpose": "A43",
  "credit_amount": 5000,
  "savings": "A61",
  "employment": "A73",
  "installment_rate": 2,
  "personal_status_sex": "A92",
  "other_debtors": "A101",
  "residence_since": 3,
  "property": "A121",
  "age": 35,
  "other_installment_plans": "A143",
  "housing": "A152",
  "existing_credits": 1,
  "job": "A173",
  "people_liable": 1,
  "telephone": "A191",
  "foreign_worker": "A201"
}
```

---

## 5️⃣ Input Validation Rules

### Numeric fields

* Must be JavaScript numbers
* No `null`, `NaN`, or strings

### Categorical fields

* Must be **non-empty strings**
* `null`, `undefined`, or empty strings (`""`) are **not allowed**
* Unknown category values are supported (handled by the model)

### Tensor shape

Each input must be converted to a **2D tensor of shape `[1, 1]`**
(batch size = 1)

---

## 6️⃣ Running Inference

### Express route example

```js
app.post("/predict", async (req, res) => {
  try {
    const input = req.body;
    const feeds = {};

    for (const key in input) {
      feeds[key] = new ort.Tensor(
        typeof input[key] === "number" ? "float32" : "string",
        [input[key]],
        [1, 1]
      );
    }

    const results = await session.run(feeds);

    // Dynamically resolve probability output name
    const outputName = Object.keys(results).find(k =>
      k.toLowerCase().includes("prob")
    );

    if (!outputName) {
      throw new Error("Probability output not found in ONNX results");
    }

    const probabilities = results[outputName].data;

    const probability = probabilities[1]; // class 1
    const creditworthy = probability >= 0.5;

    res.json({
      creditworthy,
      probability
    });
  } catch (err) {
    console.error("Inference error:", err);
    res.status(500).json({ error: "Inference failed" });
  }
});
```

---

## 7️⃣ Response Contract

### Success response

```json
{
  "creditworthy": true,
  "probability": 0.78
}
```

### Fields

* `probability`: confidence score for **class 1 (creditworthy)**
* `creditworthy`: boolean decision using threshold `0.5`

---

## 8️⃣ Performance Characteristics

* CPU-only inference
* Typical latency: **< 5 ms per request**
* Safe for real-time APIs
* Deterministic outputs (same input → same result)

---

## 9️⃣ Best Practices (Required)

* Load model **once at startup**
* Validate input types before inference
* Never mutate feature names
* Use request-level timeouts
* Log ONNX output keys once during initial testing

---

## 🔧 Troubleshooting Guide

| Issue                  | Likely Cause                   | Fix                            |
| ---------------------- | ------------------------------ | ------------------------------ |
| Missing feature error  | Field name mismatch            | Verify exact JSON keys         |
| `undefined` output   | Output tensor name mismatch    | Use dynamic output resolution  |
| All-zero probabilities | Wrong input types              | Ensure numeric vs string types |
| Runtime crash          | Empty / null categorical value | Enforce input validation       |
| App fails to start     | Wrong ONNX file path           | Verify relative path           |

---

**End of document**
