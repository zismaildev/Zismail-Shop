import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react'; 

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.id) {
            setUserId(session.user.id);
        }
    }, [session]);

    useEffect(() => {
        if (userId) {
            fetchCartItems(userId);
        }
    }, [userId]);

    const fetchCartItems = async (userId) => {
        try {
            const res = await fetch(`/api/cart?userId=${userId}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            if (data && Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setProducts([]);
        }
    };

    const handleEditProduct = (id) => {
        router.push(`/products/edit?id=${id}`);
    };

    const handleDeleteProduct = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            if (result.isConfirmed) {
                await fetch(`/api/products/${id}`, {
                    method: 'DELETE',
                });
                setProducts(products.filter((product) => product._id !== id));
                Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <Head>
                <title>My Cart</title>
                <meta name="description" content="My cart dashboard user Zismail Shop" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto max-w-7xl p-5 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
                    Admin Overview Products
                </h2>
                <h4 className="text-xl text-center">สินค้าของเรา</h4>
                <div className="text-left mt-6">
                    <Table aria-label="Products table">
                        <TableHeader>
                            <TableColumn>Image</TableColumn>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Price</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                height={100}
                                                width={95}
                                                className="h-25 w-20 object-cover" />
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>
                                            <Button auto size="small" onClick={() => handleEditProduct(product._id)}>Edit</Button>
                                            <Button auto size="small" onClick={() => handleDeleteProduct(product._id)} color="error">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        <p>ตะกร้าว่างเปล่า</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Cart;
