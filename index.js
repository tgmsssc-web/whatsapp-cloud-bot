
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WhatsApp Cloud Bot is running!");
});

// WhatsApp webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.VERIFY_TOKEN
  ) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Receive WhatsApp webhook events
app.post("/webhook", (req, res) => {
  console.log("WhatsApp webhook event received");
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
