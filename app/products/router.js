const router = require("express").Router();
const controllerProducts = require("../products/controller");
const multer = require("multer");
const connection = require("../../config/data");
const path = require("path");
// const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../../public");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/product/upload", controllerProducts.index);
router.get("/product/upload/:id", controllerProducts.view);
router.post(
  "/product/upload/",
  upload.single("image"),
  controllerProducts.store
);
router.put(
  "/product/upload/:id",
  upload.single("image"),
  controllerProducts.edit
);
router.delete("/product/upload/:id", controllerProducts.destroy);

// router.post("/product/upload", upload.single("image"), (req, res) => {
//   const { id, name, products, price, stock, status } = req.body;
//   const image = req.file;
//   if (image) {
//     connection.query(
//       {
//         sql: "INSERT INTO toko_klontong (id,name, products, price, stock, status, image_url) VALUES (?,?,?,?,?,?,?)",
//         values: [
//           parseInt(id),
//           name,
//           products,
//           price,
//           stock,
//           status,
//           `http://localhost:3000/public/${image.originalname}`,
//         ],
//       },
//       (error, result) => {
//         if (error) {
//           res.send({
//             status: "Error",
//             response: "Data Gagal",
//             error: error.message,
//           });
//         } else {
//           res.send({
//             status: "Success",
//             response: result,
//           });
//         }
//       }
//     );
//   } else {
//     res.status(400).send({ status: "Error", response: "Image not provided" });
//   }
// });

// router.get("/product", (req, res) => {
//   res.send({
//     pesan: "Berhasil",
//     nama: "Rahmat Hidayat",
//   });
// });

module.exports = router;
