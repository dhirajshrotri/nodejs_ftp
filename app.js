 var Client = require('ftp');
var fs = require('fs');
var csv = require('csv')
var obj = csv();

function MyCSV(Fone, Ftwo, Fthree){
	this.FieldOne = Fone;
	this.FieldTwo = Ftwo;
	this.FieldThree = Fthree;
};

var MyData = [];

var c = new Client();
var connectionProperties = {
host: 'localhost',
port: 2221,
user: 'bob',
password: '12345'
};

c.on('ready', function () {

    c.list(function (err, list) {
            c.status(function (err, status) {
        		console.log("connecting to server: "+status+'\n');
        	});
    	list.forEach(function dirLog(item, index){

    		console.log(item.name);

    	});
        if (err) throw err;
        list.forEach(function (element, index, array) {
            c.put('./SalesJan2009.csv', './csv_files/SalesJan2009.csv', function (err){
            	if (err) console.log("Failed to push files to server...");
            	else console.log("Files transfered successfully....");
            });
    
            c.get('./csv_files/mycsv.csv', function (err, stream) {
                if (err) throw err;
                stream.once('close', function () {
                    c.end();
                });
                stream.pipe(fs.createWriteStream('mycsv-local.csv'));
            });
            c.logout(function logoff(){
            	console.log('\n'+"Logging the user out of the server...");
            });
        });
    });

});
obj.from.path('mycsv-local.csv').to.array(function (data) {

    for (var index = 0; index < data.length; index++) {

	        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2]));
    }
    for (var index = 0; index < MyData.length; index++){

    }
	
    	console.log(MyData);
});

c.connect(connectionProperties);
