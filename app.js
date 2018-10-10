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
let writeStream = fs.createWriteStream('mycsv.xml');
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
    	
        if (err) conosle.log("Failed to connect to server.");
        list.forEach(function (element, index, array) {
            c.get('./csv_files/mycsv.csv', function (err, stream) {
                if (err) console.log("Failed to get file from server.");
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
    for (var index = 1; index < MyData.length; index++){
    	for (var i = 0; i < 3; i++) {
    		writeStream.write("<"+data[0][i]+">"+data[index][i]+"</"+data[0][i]+">");
    	}
    }
});

writeStream.on('finish', () =>{
	console.log("Finsihed writing all data to file.");
});

c.put('./mycsv.xml', './xml_files/mycsv.xml', function (err){
            	if (err) console.log("Failed to push files to server...");
            	else console.log("Files transfered successfully....");
});    
c.connect(connectionProperties);