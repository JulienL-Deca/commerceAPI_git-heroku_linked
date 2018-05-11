const PG = require("pg");
const connectionString = process.env.DATABASE_URL;

function sendBrands(request, answer){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  client.query(
    "SELECT * FROM brands;",
    function(error, result) {
      if (error) {
        return error;
      } else {
        answer.json(result.rows);
      }
    }
  );
}
function findById(brandID, answer){
  const client = new PG.Client({connectionString: connectionString,});
  client.connect();
  client.query(
    "SELECT * FROM products where brand_id = $1::uuid;", [brandID],
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
  sendBrands: sendBrands,
  findById: findById
};
