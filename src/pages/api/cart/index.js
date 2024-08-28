import connectDB from '../../../../lib/mongodb';
import Cart from '../../../../models/cart';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' }); // ถ้าไม่มี session ให้ส่งข้อความ Unauthorized
    }

    if (req.method === 'POST') {
        await connectDB();

        const { userId, productId } = req.body;

        // ตรวจสอบว่าผู้ใช้มีสิทธิ์ในการเข้าถึง
        if (session.user.id !== userId) {
            return res.status(403).json({ message: 'Forbidden' }); // ถ้า userId ไม่ตรง ให้ส่งข้อความ Forbidden
        }

        // ทำการเพิ่มสินค้าในตะกร้า
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
