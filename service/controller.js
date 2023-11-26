const connection = require("../config/data");
const fs = require("fs");
const path = require("path");

const index = (res) => {
  connection.connect();
  connection.query(
    {
      sql: "SELECT * FROM toko_klontong",
    },
    _response(res)
  );
};
const view = (req, res) => {
  connection.connect();
  connection.query(
    {
      sql: "SELECT * FROM toko_klontong WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const uploaded = (req, res) => {
  const { name, products, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../public", image.originalname);
    fs.renameSync(image.path, target);
    // res.sendFile(target);
  }
  connection.query(
    {
      sql: "INSERT INTO toko_klontong (name, products, price, stock, status, image_url) VALUES (?,?,?,?,?,?)",
      values: [
        name,
        products,
        price,
        stock,
        status,
        `http://localhost:3000/public/${image.originalname}`,
      ],
    },
    _response(res)
  );
};

const _response = (res) => {
  (error, result) => {
    if (error) {
      res.status(500).send({
        status: error,
        response: "Data Gagal",
      });
    } else {
      res.status(200).send({
        status: "Success",
        response: result,
      });
    }
  };
};

module.exports = {
  index,
  view,
  uploaded,
};
