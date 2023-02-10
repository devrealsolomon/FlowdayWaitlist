function Welcome(email) {
    return `
      <html>
        <body>
          <h1>Welcome to Our Website</h1>
          <p>Hello ${email},</p>
          <p>We are excited to have you on board! Thank you for joining our community.</p>
          <p>If you have any questions or concerns, please feel free to reach out to us.</p>
          <p>Best regards,</p>
          <p>The Team</p>
        </body>
      </html>
    `;
  }
  
  module.exports = Welcome;
