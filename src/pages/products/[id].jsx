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

  const handleAddToCart = async () => {
    console.log(session); // ตรวจสอบ session ที่ได้รับมา

    if (!session) {
      Swal.fire({
        icon: 'warning',
        title: 'ต้องล็อกอินก่อน',
        text: 'คุณต้องล็อกอินเพื่อเพิ่มสินค้าในตะกร้า',
      });
      return;
    }

    const userId = session.user.id; // ตรวจสอบว่า userId ถูกต้องหรือไม่
    console.log('User ID:', userId); // log ค่า userId เพื่อเช็คความถูกต้อง

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId: product._id }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มสินค้าลงในตะกร้าแล้ว',
          text: `${product.name} ได้ถูกเพิ่มลงในตะกร้าของคุณ`,
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด!',
          text: errorData.message || 'ไม่สามารถเพิ่มสินค้าในตะกร้าได้',
        });
      }
    } catch (error) {
      console.error('ไม่สามารถเพิ่มสินค้าในตะกร้า:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        text: 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
      });
    }
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
            <button onClick={handleAddToCart} className="mt-5 bg-blue-500 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
