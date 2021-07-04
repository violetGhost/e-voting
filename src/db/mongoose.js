const mysql = require('mysql')

/*const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'18FFaridah',
	database:'election'
});*/
const connection = mysql.createPool({
	host:'us-cdbr-east-04.cleardb.com',
	user:'b4446653e2ff72',
	password:'13539c7e',
	database:'heroku_1698e3009e97cb1'
});
/*connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});*/

module.exports = connection;

