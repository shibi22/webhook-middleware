const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const N8N_WEBHOOK_URL = "https://shibirajj.app.n8n.cloud/webhook-test/3f04ef24-c861-40c1-a013-9bdf6dc3b0ac";

// Middleware
app.use(cors()); // Adjust CORS for production
app.use(express.json());

// Webhook Route
app.post("/webhook", async (req, res) => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json(); // Log response for debugging
    console.log("Webhook Response:", data);

    if (response.ok) {
      res.status(200).json({ message: "Webhook sent successfully!", data });
    } else {
      res.status(500).json({ error: "Failed to send webhook", details: data });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
