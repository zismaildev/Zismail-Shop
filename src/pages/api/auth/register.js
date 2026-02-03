import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
  
    const { username, firstName, lastName, email, password } = req.body;
  
    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // Ensure all fields are strings to prevent NoSQL injection and other type-based issues
    if (
      typeof username !== 'string' ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid field types' });
    }

    // Optionally, trim to avoid purely whitespace values
    if (
      username.trim() === '' ||
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      return res.status(400).json({ message: 'Fields cannot be empty' });
    }
  
    try {
      // Check if the user already exists by email or username
      const existingEmailUser = await User.findOne({ email: { $eq: email } });
      const existingUsernameUser = await User.findOne({ username: { $eq: username } });

      if (existingEmailUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      if (existingUsernameUser) {
        return res.status(400).json({ message: 'Username already in use' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Create a new user with default role 'member' and empty cart
      const user = new User({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'member', // Set default role to 'member'
        cart: [], // Initialize the cart as an empty array
      });
  
      await user.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
