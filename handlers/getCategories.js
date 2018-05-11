const PG = require("pg");
const connectionString = process.env.DATABASE_URL;

function sendCategories(request, answer){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  client.query(
    "SELECT * FROM categories;",
    function(error, result) {
      if (error) {
        answer.json(error);
      } else {
        answer.json(result.rows);
      }
    }
  );
}
function findById(categoryId, answer){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  client.query(
    "SELECT * FROM categories WHERE id = $1::uuid;", [categoryId],
    function(error, result) {
      if (error) {
        console.warn(error);
        return error;
      } else {
        answer.json(result.rows[0]);
      }
    }
  );
}
function findProductByCategoryId(categoryId, answer){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  client.query(
    "SELECT * FROM products INNER JOIN category_products on (products.id = category_products.product_id) WHERE category_products.category_id = $1::uuid;", [categoryId],
    function(error, result) {
      if (error) {
        console.warn(error);
        return error;
      } else {
        answer.json(result.rows);
      }
    }
  );
}
module.exports = {
  sendCategories: sendCategories,
  findById: findById,
  findProductByCategoryId: findProductByCategoryId
};
