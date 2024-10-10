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

  const addToCart = async () => {
    if (!session) {
      Swal.fire('กรุณาเข้าสู่ระบบ'); // แจ้งเตือนหากผู้ใช้ยังไม่ได้เข้าสู่ระบบ
      return;
    }
  
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product._id,
        userId: session.user.id, // ใช้ ID ของผู้ใช้ที่ล็อกอิน
      }),
    });
  
    if (res.ok) {
      const data = await res.json();
      Swal.fire('สินค้าถูกเพิ่มลงในตะกร้า', '', 'success'); // แจ้งเตือนเมื่อเพิ่มสำเร็จ
    } else {
      const errorData = await res.json();
      Swal.fire('เกิดข้อผิดพลาด: ' + errorData.message, '', 'error'); // แจ้งเตือนหากเกิดข้อผิดพลาด
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
            <button 
              onClick={addToCart} 
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
