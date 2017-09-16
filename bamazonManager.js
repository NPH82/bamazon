var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table-zh");


var connection = mysql.createConnection({
  host: "localhost",
  PORT: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

function connected () {
connection.connect(function(err) {
  if (err) throw err;
  console.log("this is connected");
  managerView();
});
};

function managerView() {
  inquirer
  .prompt([{
    type: "list",
    message: "What are you trying to do:",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Sign Out"],
    name: "action"
  }]).then(function(answer) {
    switch (answer.action){
    case "View Products for Sale":
    displayAllItems();
    break;
    case "View Low Inventory":
    lowInventory();
    break;
    case "Add to Inventory":
    addInventory();
    break;
    case "Add New Product":
    newProduct();
    break;
    case "Sign Out":
    console.log("You are signed out.")
    connection.end();
    default:
    console.log(err);
}
  })
}

//displays items in command line
function displayAllItems() {
  
    var table = new Table ({
      chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
      , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
      , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
      , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
      head: ["ID", "Item", "Department", "Price", "Available"],
      colWidths: [8, 20, 15, 10, 15]
    });
  
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for(var i = 0, l = res.length; i < l; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + parseFloat(res[i].price), res[i].stock_quantity]);
      }
      console.log(table.toString());
      managerView();
    })
  };

 function lowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for(var i = 0; i < res.length; i++) {
        if(res[i].stock_quantity < 5) {
      console.log("*".repeat(50));
      console.log("We're running low on : " + res[i].product_name);
      console.log("*".repeat(50));
        }
      }andThen();
      });
    }

  function andThen() {
    inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["Main Menu", "Sign Out"],
        name: "decision"
      }
    ]).then(function(answer) {
      switch (answer.decision) {
        case "Main Menu":
        managerView();
        break;
        case "Sign Out":
        console.log("You are signed out.");
        connection.end();
        break;
        default:
        console.log(err);
      }
    })
  }

  function addInventory() {
    
  }
connected();