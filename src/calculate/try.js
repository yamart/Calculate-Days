var numberOfDays = require('./calculate-as-wanted.js'),
    fs = require('fs');

fs.readFile('./data.csv', 'utf-8', function(err,data) {
    if(err) {
        console.log(err.message);
        return;
    }

    data.split(/\n/).map((d) => {
       console.log(numberOfDays(d,false)); 
    });
});