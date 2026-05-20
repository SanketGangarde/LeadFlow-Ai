global.crypto = require('crypto');
const SibApiV3Sdk = require('sib-api-v3-sdk');

/**
 * Sends a confirmation email to the captured lead using Brevo's Transactional Email API.
 * @param {Object} lead - The lead document containing name, email, interest, etc.
 */
const sendConfirmationEmail = async (lead) => {
  try {
    // Configure API key authorization
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    // Instantiate TransactionalEmailsApi
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Create SendSmtpEmail object
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // Set email subject
    sendSmtpEmail.subject = 'Thank You for Contacting LeadFlow AI';

    // Set plain text and HTML content
    sendSmtpEmail.textContent = `Hello ${lead.name},\n\nThank you for contacting LeadFlow AI.\nWe have received your inquiry and our team will connect with you soon.\n\nRegards,\nLeadFlow AI Team`;

    sendSmtpEmail.htmlContent = `<html><body>
      <p>Hello ${lead.name},</p>
      <p>Thank you for contacting LeadFlow AI.<br>We have received your inquiry and our team will connect with you soon.</p>
      <p>Regards,<br>LeadFlow AI Team</p>
    </body></html>`;

    // Set verified sender details (Note: sender email must be verified in Brevo account)
    sendSmtpEmail.sender = {
      name: 'LeadFlow AI',
      email: process.env.SENDER_EMAIL || process.env.EMAIL_USER || 'sgangarde747@gmail.com',
    };

    // Set recipient details
    sendSmtpEmail.to = [
      {
        email: lead.email,
        name: lead.name,
      },
    ];

    // Send the email using the SDK
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Email sent successfully via Brevo API. Message ID:', data.messageId);
  } catch (error) {
    console.error('❌ Brevo API email sending failed:', error.response?.text || error.message || error);
  }
};

module.exports = { sendConfirmationEmail };
