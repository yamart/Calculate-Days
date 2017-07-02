var numberOfDays = require('./calculate-as-wanted.js');

describe('Calculate Days', () => {
    it('should return sorted dates and the number of days between them', () => {
        expect(numberOfDays('01 01 1900, 01 01 2010', false)).toEqual('01 01 1900, 01 01 2010, 40177');
    });

    it('should return sorted dates and the number of days between them including the end date', () => {
        expect(numberOfDays('03 01 2005, 01 01 2005', true)).toEqual('01 01 2005, 03 01 2005, 3');
    });  

    it('should return an invalid data type', () => {
        expect(function() {
            numberOfDays(null)
        }).toThrowError("Data provied with wrong type");
    }); 

    it('should return an invalid data format', () => {
        expect(function() {
            numberOfDays("")
        }).toThrowError("Invalid Format, You need to provide two dates");
    });     

    it('should return an invalid date format', () => {
        expect(function() {
            numberOfDays('3 01 2005, 01 01 2005')
        }).toThrowError(Error);
    }); 

    it('should return an invalid date', () => {
        expect(function() {
            numberOfDays('29 02 1999, 01 01 2000')
        }).toThrowError(Error);
    });                
});