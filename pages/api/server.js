const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const welcome = require("./welcome");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/send", async (req, res) => {
  const email = req.body.email;

  try {
    const header = {
      "Content-Type": "application/json",
      "api-key": process.env.NEXT_PUBLIC_SENDINBLUE_API.toString(),
    };

    const response = await axios.post(
      "https://api.sendinblue.com/v3/smtp/email",
      {
        to: [{ email: email }],
        from: [process.env.FROM_EMAIL],
        subject: "Welcome to our App!",
        htmlContent: welcome.template(email),
      },
      { headers: header }
    );

    if (response.status >= 200 && response.status < 300) {
      return res.status(200).json({
        message: "Welcome email sent successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
