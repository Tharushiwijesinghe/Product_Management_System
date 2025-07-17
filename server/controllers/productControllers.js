import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
  //req.body okkoma tika gannawa req.body.name kiyl gttoth name ek wtry ganneh
  const { id, name, price } = req.body;


  if (!id || !name || !price) {
    return res.status(400).json({ message: 'All fields are required' });
    //meken pase ituru code tika salaknne na
  }

  try {
    const newProduct = new Product({ id, name, price });
    await newProduct.save();
    res.status(201).json( newProduct );
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


