//saving the input as a file without db connection
const fs = require("fs");
const path = require("path");

const products = [];

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];

      if (!err) {
        //JSON.parse takes JSON and converts into object or array

        products = JSON.parse(fileContent);
      }
      products.push(this);
      //JSON.stringify takes javascript object or array converts into JSON
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll() {
    return products;
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
