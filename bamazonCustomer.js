var mysql = require('mysql');
var inquirer = require('inquirer');


//how many units of the product

//if enough update mySQL to reflect remaining quantity
//once updated show customer to cost of purchase
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon_db"
});

function connected () {
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayAllItems();
});
};
//displays items in command line
function displayAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for(var i = 0, l = res.length; i < l; i++) {
    	console.log("Item ID: " + res[i].item_id);
    	console.log("Product: " + res[i].product_name);
    	console.log("Price: $" + parseFloat(res[i].price));
    	console.log("=".repeat(25));
		}
		customerChoices();
	});
}

//asks customers the product they would like to buy
function customerChoices () {
	inquirer
	.prompt([
		{
		type: "input",
		message: "What is the item ID of the product you would like to purchase?",
		name: "itemNumber"
	},
	{
		type: "input",
		message: "How many units would you like to buy?",
		name: "quantity"
	}
])
	.then(function(answer) {
		//check to see if there is enough product to meet customer request
		var query = "SELECT stock_quantity, product_name, price FROM products WHERE ?";
		connection.query(query, { item_id: answer.itemNumber }, function(err, res) {
				
			for(var i = 0, l = res.length; i < l; i++) {
				var updatedQuantity = (res[i].stock_quantity - answer.quantity);
				var subTotal = parseFloat(answer.quantity * res[i].price);

			if(res[i].stock_quantity === 0 || updatedQuantity < 0) {
				console.log("\n");
				console.log("=".repeat(50));
				console.log("We are currently out of " + res[i].product_name + " supplies.")
				console.log("=".repeat(50) + "\n");
				additonalPurchase();
			} else {
				var query = "UPDATE products SET stock_quantity = " + updatedQuantity + " WHERE ?";
				
				connection.query(query, { item_id: answer.itemNumber }, function(err, res) {
				})
				console.log("=".repeat(50));
				console.log("Your purchase comes to: $" + subTotal + ".");
				console.log("There are " + updatedQuantity + " units of " + res[i].product_name + " still available.")
				console.log("=".repeat(50) + "\n");
				additonalPurchase();
				}
			}
		})
		
});
	

function additonalPurchase() {
	inquirer
	.prompt({
		type: "confirm",
		message: "Would you like to make another purchase?",
		name: "oneMoreBuy"
	})
	.then(function(answer) {
		if (answer.oneMoreBuy === true) {
			displayAllItems();
		} else {
			console.log("\n");
			console.log("=".repeat(60));
			console.log("Thanks for shopping with Bamazon. Hope to see you again.");
			console.log("=".repeat(60) + "\n");
			connection.end();
		}
	})
}

connected();