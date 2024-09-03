import { getSession } from 'next-auth/react';
import connectDB from '../../../../lib/mongodb';
import Cart from '../../../../models/cart';

export default async function handler(req, res) {
    const session = await getSession({ req });

    // ตรวจสอบว่า session มีอยู่จริง
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        await connectDB();

        const { userId, productId } = req.body;

        // ตรวจสอบว่า userId ตรงกับ session
        if (session.user.id !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        try {
            const cartItem = new Cart({ userId, productId });
            await cartItem.save();
            return res.status(201).json({ message: 'Product added to cart' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
