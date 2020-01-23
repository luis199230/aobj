const aobj = require('./index.js');


test('Check if {} Object is empty', () => {
    const isEmpty = aobj.isEmpty({});
    expect(isEmpty).toBe(true);
})

test('Check if {a: 1} Object is empty', () => {
    const isEmpty = aobj.isEmpty({a: 1});
    expect(isEmpty).toBe(false);
})

test('Test map {a: 1, b: 2} + 1 is {a: 2, b: 3}', () => {
    const obj = aobj.map({a:1,b:2}, (key, value) => {return {key, value: value+1}});
    expect(obj.a).toBe(2);
})