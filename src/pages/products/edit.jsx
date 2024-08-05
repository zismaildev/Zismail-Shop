import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button, Card, Input, Textarea, Spacer } from '@nextui-org/react';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setForm({
          name: data.data.name,
          price: data.data.price,
          image: data.data.image,
          description: data.data.description,
        });
      };
      fetchProduct();
    }
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Product update successfully!"
      }).then(() => {
        router.push('/products/products');

      })
    }
  };

  return (
    <div>
      <Head>
        <title>Edit Product</title>
        <meta name="description" content="Edit product details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-3xl p-5 text-center">
        <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
        <Card className='mx-auto max-w-lg p-6'>
          <form onSubmit={updateProduct} className='space-y-4'>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              label="Product Name"
              placeholder='Enter product name'
              required
            />
            <Input
              type='number'
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              label="Product Price"
              placeholder='Enter product price'
              required
            />
            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              label="Product Image URL"
              placeholder='Enter product image URL'
              required
            />
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              label="Product Description"
              placeholder='Enter product description'
              required
            />
            <Button type='submit' color="secondary" block>
              Update Product
            </Button>
          </form>
        </Card>
        <Spacer y={1} />
        <Button onClick={() => router.push('/')} color="primary" block>
          Go back
        </Button>
      </div>
    </div>
  );
};

export default EditProduct;
