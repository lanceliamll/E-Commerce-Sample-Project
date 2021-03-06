const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// # Functionality: GET a product
// # Route:         localhost:5000/api/products
// # isPrivate?:    true
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(500).json({ message: 'No Products found!' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error! ' });
  }
});

// # Functionality: GET a product by ID
// # Route:         localhost:5000/api/products/:id
// # isPrivate?:    true
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(500).json({ message: 'No Product found!' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error! ' });
  }
});

// # Functionality: CREATE a product
// # Route:         localhost:5000/api/products
// # isPrivate?:    true
router.post('/', async (req, res) => {
  const { productName, productDesc, productType, productPrice } = req.body;

  try {
    const product = await Product.findOne({ productName });

    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    let newProduct = await new Product({
      productName,
      productDesc,
      productType,
      productPrice
    }).save();

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// # Functionality: UPDATE a product
// # Route:         localhost:5000/api/products/:id
// # isPrivate?:    true
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productName, productDesc, productType, productPrice } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    await product.updateOne({
      productName,
      productDesc,
      productType,
      productPrice
    });

    res.json({ message: 'Product updated!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// # Functionality: DELETE a product by ID if the user is admin only
// # Route:         localhost:5000/api/products/:id
// # isPrivate?:    true

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(500).json({ message: 'No Product found!' });
    }

    await product.delete();

    res.json({ message: 'Product Deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
