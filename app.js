const express = require("express");
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5000;

app.use(express.static("dist"));

// adding a comment for PR; this is the actual comment
app.get("/health", (req, res) => {
  res.send("i'm ok");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
