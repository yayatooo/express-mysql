const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "public/" });
// const productController = require("./controller");
const connection = require("../config/data");

// router.get("/product", productController.index);

router.get("/product", (req, res) => {
  connection.connect();
  connection.query(
    {
      sql: "SELECT * FROM toko_klontong",
    },
    (error, result) => {
      if (error) {
        res.send({
          status: error,
          response: "Data Gagal",
        });
      } else {
        res.status(200).send({
          status: "Success",
          response: result,
        });
      }
    }
  );
  connection.end();
});

router.get("/product/:id", (req, res) => {
  connection.connect();
  connection.query(
    {
      sql: "SELECT * FROM toko_klontong WHERE id = ?",
      values: [req.params.id],
    },
    (error, result) => {
      if (error) {
        res.send({
          status: error,
          response: "Data Gagal",
        });
      } else {
        res.status(200).send({
          status: "Success",
          response: result,
        });
      }
    }
  );
  connection.end();
});

// router.post("/product", upload.single("image"), (req, res) => {
//   const { name, products, price, stock, status } = req.body;
//   const image = req.file;
//   if (image) {
//     const target = path.join(__dirname, "../public", image.originalname);
//     fs.renameSync(image.path, target);
//     // res.sendFile(target);
//   }
//   connection.query(
//     {
//       sql: "INSERT INTO toko_klontong (name, products, price, stock, status, image_url) VALUES (?,?,?,?,?,?)",
//       values: [
//         name,
//         products,
//         price,
//         stock,
//         status,
//         `http://localhost:3000/public/${image.originalname}`,
//       ],
//     },
//     (error, result) => {
//       if (error) {
//         res.status(500).send({
//           status: error,
//           response: "Data Gagal",
//         });
//       } else {
//         res.status(200).send({
//           status: "Success",
//           response: result,
//         });
//       }
//     }
//   );
//   connection.end();
//   res.end;
// });

module.exports = router;
