const connection = require("../../config/data");

const index = (req, res) => {
  const { search } = req.query;
  let exect = {};
  if (search) {
    exect = {
      sql: "SELECT * FROM toko_klontong WHERE name LIKE ?",
      values: [`%${search}%`],
    };
  } else {
    exect = {
      sql: "SELECT * FROM toko_klontong",
    };
  }
  connection.query(exect, _response(res));
};

const view = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM toko_klontong WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const destroy = (req, res) => {
  connection.query(
    {
      sql: "DELETE FROM toko_klontong WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const store = (req, res) => {
  const { id, name, products, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    connection.query({
      sql: "INSERT INTO toko_klontong (id, name, products, price, stock, status, image_url) VALUES (?,?,?,?,?,?,?)",
      values: [
        parseInt(id),
        name,
        products,
        price,
        stock,
        status,
        `http://localhost:3000/public/${image.originalname}`,
      ],
    });
  }
  _response(res);
};

const edit = (req, res) => {
  const { id, name, products, price, stock, status } = req.body;
  const image = req.file;
  let sql;
  let values;

  if (image) {
    sql =
      "UPDATE toko_klontong SET name = ?, products = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?";
    values = [
      name,
      products,
      price,
      stock,
      status,
      `http://localhost:3000/public/${image.originalname}`,
      parseInt(id),
    ];
  } else {
    sql =
      "UPDATE toko_klontong SET name = ?, products = ?, price = ?, stock = ?, status = ? WHERE id = ?";
    values = [name, products, price, stock, status, parseInt(id)];
  }
  connection.query({ sql, values }), _response(res);
};

const _response = (res) => (error, result) => {
  if (error) {
    res.send({
      status: "Error",
      response: "Data Gagal",
      error: error.message,
    });
  } else {
    res.send({
      status: "Success",
      response: result,
    });
  }
};

module.exports = {
  index,
  view,
  store,
  edit,
  destroy,
};
