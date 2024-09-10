import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import Swal from 'sweetalert2'; // นำเข้า SweetAlert2

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    setProduct(data.data);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>{product.name} - Product Details</title>
        <meta name="description" content={`Details of ${product.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {product.name}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Image
              alt={product.name}
              className="rounded-lg"
              width={600}
              height={600}
              src={product.image}
            />
          </div>
          <div className="text-left">
            <h2 className="mt-2 text-2xl font-bold">Product Detail</h2>
            <p className="mt-3 text-xl">{product.name}</p>
            <h2 className="mt-8 text-2xl font-bold">Price</h2>
            <p className="mt-3 text-xl">Price: {product.price}</p>
            <p className="mt-3 text-xl">Description: {product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
