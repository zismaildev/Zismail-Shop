import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

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
            <h2 className="mt-8 text-2xl font-bold">Education</h2>
            <p className="mt-3 text-xl">Price: {product.price}</p>
            <p className="mt-3 text-xl">description: {product.description}</p>
            <button 
              onClick={addToCart}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
