import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import Swal from 'sweetalert2';

const Overview = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateProduct = () => {
        router.push('/products/create');
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
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div>
            <Head>
                <title>Overview</title>
                <meta name="description" content="Overview dashboard admin Zismail Shop" />
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
                            {products.map((product) => (
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
                            ))}
                        </TableBody>
                    </Table>
                    <div className='mt-3'>
                        <Button auto size="small" onClick={handleCreateProduct} color="primary">Create</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
