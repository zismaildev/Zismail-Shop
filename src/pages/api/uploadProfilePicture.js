import nextConnect from 'next-connect';
import multer from 'multer';
import { getSession } from 'next-auth/react';
import User from '../../../models/user';
import connectDB from '../../../lib/mongodb';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('Error:', error);
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('profilePicture'));

apiRoute.post(async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ profilePicture: user.profilePicture });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
