var mysql = require('mysql');
var inquirer = require('inquirer');


//display all the items available for sale.
//include id, names, and prices.
//ask customer id of product they would like to buy
//how many units of the product

//if enough update mySQL to reflect remaining quantity
//once updated show customer to cost of purchase
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "Bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayAllItems();
});

function displayAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for(var i = 0, l = res.length; i < l; i++) {
    	console.log("Item ID: " + res[i].item_id);
    	console.log("Product: " + res[i].product_name);
    	console.log("Price: $" + parseFloat(res[i].price));
    	console.log("=".repeat(25));
    }
    connection.end();
  });
}


function customerChoices () {
	inquirer.prompt([
	{
		type: "input",
		message: "What is the item number of the product you would like to purchase?",
		name: "itemNumber"
	}, 
	{
		type: "input",
		message: "How many units of the item would you like to purchase?",
		name: "unitQuanity"
	}]).then(function(answer) {
		//check to see if there is enough product to meet customer request
		console.log(answer.itemNumber);
		console.log(answer.unitQuanity);
		//if not return "insuffiect quantity"
	})
}
customerChoices();
