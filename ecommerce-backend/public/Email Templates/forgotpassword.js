exports.getForgotPasswordEmail = (username, resetLink) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 20px 30px; background-color: #007BFF; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 16px; color: #333;">Hello <strong>${username}</strong>,</p>
            <p style="font-size: 15px; color: #555;">
              We received a request to reset your password. Click the button below to set a new password. This link will expire in 30 minutes.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #007BFF; color: #ffffff; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Your Password
              </a>
            </div>
            <p style="font-size: 14px; color: #999;">If you didn't request this, you can safely ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #f0f0f0; text-align: center; color: #666; font-size: 13px;">
            &copy; ${new Date().getFullYear()} Your App. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;
};
exports.getOtpEmail = (username, otp) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 20px 30px; background-color: #28a745; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px;">Your One-Time Password (OTP)</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 16px; color: #333;">Hello <strong>${username}</strong>,</p>
            <p style="font-size: 15px; color: #555;">
              Your OTP for verification is:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #28a745; color: #ffffff; padding: 14px 28px; font-size: 22px; border-radius: 5px; display: inline-block; letter-spacing: 3px;">
                ${otp}
              </div>
            </div>
            <p style="font-size: 14px; color: #999;">This OTP is valid for 10 minutes. If you didn’t request this, please ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #f0f0f0; text-align: center; color: #666; font-size: 13px;">
            &copy; ${new Date().getFullYear()} Your App. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;
};
exports.getWelcomeEmail = (username, email, password) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 20px 30px; background-color: #007bff; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to Our App!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 16px; color: #333;">Hi <strong>${username}</strong>,</p>
            <p style="font-size: 15px; color: #555;">
              Thank you for registering. Below are your login credentials:
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff;">
              <p style="margin: 0; font-size: 15px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0 0 0; font-size: 15px;"><strong>Password:</strong> ${password}</p>
            </div>
            <p style="font-size: 14px; color: #999;">Please keep this information safe. You can change your password anytime from your account settings.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #f0f0f0; text-align: center; color: #666; font-size: 13px;">
            &copy; ${new Date().getFullYear()} Your App. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;
};


