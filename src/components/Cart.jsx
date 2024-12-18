import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between items-center mb-2">
                                <span>{item.name}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={clearCart}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    );
}
