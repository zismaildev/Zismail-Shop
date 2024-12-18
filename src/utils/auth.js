import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function getDatabaseConnection() {
  if (!client.isConnected()) await client.connect();
  return client.db('your-database-name'); // Replace with your actual database name
}

export async function sendResetPasswordEmail(identifier) {
  const resetLink = `http://localhost:3000/reset-password?identifier=${encodeURIComponent(identifier)}`;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: identifier,
    subject: 'Password Reset',
    text: `Click the link to reset your password: ${resetLink}`,
    html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function resetUserPassword(identifier, newPassword) {
  const db = await getDatabaseConnection();
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.collection('users').updateOne({ email: identifier }, { $set: { password: hashedPassword } });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
}
