const aobj = require('./index.js');


test('Check if {} Object is empty', () => {
    const isEmpty = aobj.isEmpty({});
    expect(isEmpty).toBe(true);
})

test('Check if {a: 1} Object is empty', () => {
    const isEmpty = aobj.isEmpty({a: 1});
    expect(isEmpty).toBe(false);
})