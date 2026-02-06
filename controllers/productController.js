import Product from "../models/Product.js";

// @desc Get all products
// @route GET /api/products
// @desc Get products with search & pagination
// @route GET /api/products
export const getProducts = async (req, res) => {
  const pageSize = 6; // products per page
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
};


// @desc Get single product
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc Create product
// @route POST /api/products
export const createProduct = async (req, res) => {
  console.log("FILE:", req.file); // 👈 debug

  const { name, price } = req.body;

  const product = new Product({
    name,
    price,
    image: req.file.path,
  });

  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
};

// @desc Delete product (ADMIN)
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
