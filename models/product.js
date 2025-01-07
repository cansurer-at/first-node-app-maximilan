//saving the input as a file without db connection
const fs = require("fs");
const path = require("path");

//p is global helper variable now
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

//refactor with helper function
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    //JSON.parse takes JSON and converts into object or array
    else cb(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      //JSON.stringify takes javascript object or array converts into JSON
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
    fs.readFile(p, (err, fileContent) => {});
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};

//Saving just into storage without creating a file with it

// const products = [];

// module.exports = class Product {
//   constructor(t) {
//     this.title = t;
//   }
//   save() {
//     products.push(this);
//   }

//   static fetchAll() {
//     return products;
//   }
// };
