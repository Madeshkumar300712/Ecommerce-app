import User from "../models/User.js";
import Cart from "../models/Cart.js";

// Add to cart
export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  const user = await User.findById(req.user._id);

  const itemIndex = user.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    user.cart[itemIndex].qty += qty;
  } else {
    user.cart.push({ product: productId, qty });
  }

  await user.save();
  res.json(user.cart);
};

// Get cart
export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");
  res.json(user.cart);
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // 🔹 Find cart
    let cart = await Cart.findOne({ user: req.user._id });

    // 🔹 If no cart, create empty cart
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    // 🔹 Remove product
    cart.items = cart.items.filter(
      (item) =>
        item.product &&
        item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Remove cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};