const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const User = require("./model");
const fs = require("fs");
const upload = multer({ dest: "public" });
const { promisify } = require("util");
const rename = promisify(fs.rename);

router.post("/product/upload", upload.single("image"), async (req, res) => {
  const { id, name, products, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../public", image.originalname);
    fs.renameSync(image.path, target);
  }
  try {
    await User.sync();
    const result = await User.create({
      id,
      name,
      products,
      price,
      stock,
      status,
      image: `http://localhost:3000/public/${image.originalname}`,
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/product/upload", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/product/upload/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/product/upload/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/products/upload/:id", upload.single("image"), async (req, res) => {
  console.log("PUT route reached");
  const { id, name, products, price, stock, status } = req.body;
  const image = req.file;

  try {
    // Check if the user with the specified ID exists
    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user information
    existingUser.name = name || existingUser.name;
    existingUser.products = products || existingUser.products;
    existingUser.price = price || existingUser.price;
    existingUser.stock = stock || existingUser.stock;
    existingUser.status = status || existingUser.status;

    // If a new image is provided, update the image URL
    if (image) {
      const target = path.join(__dirname, "../../public", image.originalname);
      await rename(image.path, target);
      existingUser.image = `http://localhost:3000/public/${image.originalname}`;
    }

    // Save the updated user
    await existingUser.save();

    res.json(existingUser);
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
