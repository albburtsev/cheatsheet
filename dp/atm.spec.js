import should from 'should';
import atm from './atm';

describe('ATM function', () => {
    it('should correct find size of subset', () =>  {
        should(atm([1, 3, 4], 6)).be.eql(2);
        should(atm([1, 4, 6], 8)).be.eql(2);
        should(atm([1, 3, 4, 5], 15)).be.eql(3);
        should(atm([5, 10, 20], 1)).be.eql(+Infinity);
        should(atm([2], 7)).be.eql(+Infinity);
    });
});
