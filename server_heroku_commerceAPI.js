const express = require("express");
const brands = require("./handlers/getBrands");
const products = require("./handlers/getProducts");
const categories = require("./handlers/getCategories");
const app = express();
const port = process.env.PORT || 3000;
////////////////////////////////////////////////////////
app.get("/parameters/:myParam", function(request, result) {
  result.json(request.params.myParam);
});
app.get("/parameters", function(request, result) {
  result.json(request.query);
});
////////////////////////////////////////////////////////
app.get("/", function (request, result) {
  result.send("not a good route ;-)");
});
////////////////////////////////////////////////////////
app.get("/brands", function(request, result){
  brands.sendBrands(request, result);
});
app.get("/brands/:brandID", function(request, result){
  const brandID = request.params.brandID;
  brands.findById(brandID, result);
});
////////////////////////////////////////////////////////
app.get("/products", function(request, result){
  products.sendProducts(request, result);
});
app.get("/products/:productID", function(request, result){
  const productId = request.params.productID;
  products.findById(productId, result);
});
///////////////////////////////////////////////////////
app.get("/categories", function(request, result){
  categories.sendCategories(request, result);
});
app.get("/categories/:categoryID", function(request, result){
  const categoryId = request.params.categoryID;
  categories.findById(categoryId, result);
});
app.get("/categories/:categoryID/products", function(request, result){
  const categoryId = request.params.categoryID;
  categories.findProductByCategoryId(categoryId, result);
});
////////////////////////////////////////////////////////
app.use(function (req, res, next) {
  res.status(404).send("404 NOT FOUND")
});
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('ERROR 500 : Something broke!')
})

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
