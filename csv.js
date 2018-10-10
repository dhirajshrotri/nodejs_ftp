var csv = require('csv')

var obj = csv();

function MyCSV(Fone, Ftwo, Fthree){
	this.FieldOne = Fone;
	this.FieldTwo = Ftwo;
	this.FieldThree = Fthree;
};

var MyData = [];

	obj.from.path('mycsv-local.csv').to.array(function (data) {

	    for (var index = 0; index < data.length; index++) {

	        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2]));

	    }

	    console.log(MyData);

	});