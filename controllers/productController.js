const Product = require('../models/productModel');
const { getPostData } = require('../utils');

/**
 * @desc Gets all products
 * @route GET /api/products
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log('error from controller', error);
  }
};

/**
 * @desc Gets single products
 * @route GET /api/products/:id
 */
const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log('error from controller', error);
  }
};

/**
 * @desc Create a product
 * @route POST /api/products
 */
const createProduct = async (req, res) => {
  try {
    let body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    // use await because this function returns a promise
    const newProduct = await Product.create(product);

    res.writeHead(201, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log('error from controller', error);
  }
};

/**
 * @desc Update a products
 * @route PUT /api/products/:id
 */
const updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      let body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      // use await because this function returns a promise
      const updProduct = await Product.update(id, productData);

      res.writeHead(200, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log('error from controller', error);
  }
};

/**
 * @desc Gets single products
 * @route GET /api/products/:id
 */
const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log('error from controller', error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
