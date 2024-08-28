// components/Cart.js
import { useEffect, useState } from 'react';
import { Button, Card } from '@nextui-org/react';

const Cart = ({ userId }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch(`/api/cart?userId=${userId}`);
            const data = await response.json();
            setCart(data.products || []);
        };

        fetchCart();
    }, [userId]);

    const handleRemoveProduct = async (productId) => {
        const response = await fetch(`/api/cart?userId=${userId}&productId=${productId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setCart(cart.filter(item => item.productId._id !== productId));
        }
    };

    return (
        <div>
            {cart.map(item => (
                <Card key={item.productId._id}>
                    <h3>{item.productId.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <Button onClick={() => handleRemoveProduct(item.productId._id)}>Remove</Button>
                </Card>
            ))}
        </div>
    );
};

export default Cart;
