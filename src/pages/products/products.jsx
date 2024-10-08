import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, Link } from '@nextui-org/react';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <Head>
                <title>Zismail Shop</title>
                <meta name="description" content="All Product from Zismail Shop" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Product
                </h2>
                <h4 className="text-xl">สินค้าของเรา</h4>
                <div className='grid grid-cols-2 gap-6 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4  p-5 mt-5'>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Link href={`/products/${product._id}`} key={product._id}>
                                <Card className="group relative items-center justify-center overflow-hidden shadow-lg rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                                    <div className="aspect-w-3 aspect-h-2">
                                        <Image
                                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                            layout='responsive'
                                            height={250}
                                            width={200}
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </div>
                                    <CardBody>
                                        <div className="p-4 bg-white">
                                            <h3 className="mb-2 text-lg font-bold text-gray-900">{product.name}</h3>
                                            <p className="text-gray-600">{product.description}</p>
                                            <p className="text-gray-600">{product.price} $</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
