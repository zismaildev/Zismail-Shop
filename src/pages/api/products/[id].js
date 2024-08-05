// pages/api/products/[id].js
import connectDB from "../../../../lib/mongodb";
import Product from "../../../../models/product";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  if (req.method === "GET") {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, price, image, description } = req.body;
      const product = await Product.findByIdAndUpdate(
        id,
        { name, price, image, description },
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
