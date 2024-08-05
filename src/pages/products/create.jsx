import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Card, Input, Textarea, Spacer } from '@nextui-org/react';
import Swal from 'sweetalert2';


const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = { name, price, image, description };
      await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product created successfully!',
      }).then(() => {
        router.push('/');
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <Head>
        <title>Add Product</title>
        <meta name="description" content="Create Product Zismail Dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto max-w-7xl p-5 text-center">
        <h2 className='text-3xl font-bold mb-6'>Create Product</h2>
        <Card className='mx-auto max-w-lg p-6'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              label="Product Name"
              placeholder='Enter product name'
              required
            />
            <Input
              type='number'
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              label="Product Price"
              placeholder='Enter product price'
              required
            />
            <Input
              onChange={(e) => setImage(e.target.value)}
              value={image}
              label="Product Image URL"
              placeholder='Enter product image URL'
              required
            />
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              label="Product Description"
              placeholder='Enter product description'
              required
            />
            <Button type='submit' color="secondary" className='w-full'>
              Create Product
            </Button>
          </form>
        </Card>
        <Spacer y={1} />
        <Link href="../product">
          <Button color="primary" block>
            Go back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AddProduct;
