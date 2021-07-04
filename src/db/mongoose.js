const mysql = require('mysql')

const connection = mysql.createConnection({
	host:'us-cdbr-east-04.cleardb.com',
	user:'b919182a4968ff',
	password:'decebae2',
	database:'heroku_831396407'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;