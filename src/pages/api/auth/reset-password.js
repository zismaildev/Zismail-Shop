import { sendResetPasswordEmail, resetUserPassword } from '../../../utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { identifier, password } = req.body;

  if (!identifier) {
    return res.status(400).json({ message: 'Identifier is required' });
  }

  if (password) {
    // Handle password reset
    try {
      await resetUserPassword(identifier, password);
      return res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to reset password' });
    }
  } else {
    // Handle sending reset email
    try {
      await sendResetPasswordEmail(identifier);
      return res.status(200).json({ message: 'Reset email sent' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send reset email' });
    }
  }
}
