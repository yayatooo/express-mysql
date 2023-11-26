const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("./app/products/router");
const routerv2 = require("./app/user/routes");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api/v1", router);
app.use("/api/v2", routerv2);
app.listen(port, () => console.log(`server use ${port}`));
