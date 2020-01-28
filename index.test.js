const aobj = require('./index.js');

test('Check if {} Object is empty', () => {
    const isEmpty = aobj.isEmpty({});
    expect(isEmpty).toBe(true);
})

test('Check if {a: 1} Object is empty', () => {
    const isEmpty = aobj.isEmpty({a: 1});
    expect(isEmpty).toBe(false);
})

test('Check if {} is Object', () => {
    const isObject = aobj.isObject({});
    expect(isObject).toBe(true);
})

test('Check if {a: 1} is Object', () => {
    const isObject = aobj.isObject({a: 1});
    expect(isObject).toBe(true);
})

test('Check if Array is Object', () => {
    const isObject = aobj.isObject([1,2,3]);
    expect(isObject).toBe(false);
})

test('Check if new Number is Object', () => {
    const isObject = aobj.isObject(new Number(1));
    expect(isObject).toBe(false);
})

test('Check Object Clone {a: 1}', () => {
    const a = {a: 1};
    const b = aobj.clone(a);
    b.a = 2;
    expect(a.a).toBe(1);
})

test('Check Deep Object Clone {a: {b: {c: 1}}}', () => {
    const a = {a: {b: {c: 1}}};
    const b = aobj.clone(a);
    b.a.b.c = 2;
    expect(a.a.b.c).toBe(1);
})

test('Test map {a: 1, b: 2} + 1 is {a: 2, b: 3}', () => {
    const obj = aobj.map({a:1,b:2}, (key, value) => {
        return { key, value: value + 1 };
    });
    expect(obj.a).toBe(2);
})

test('Test mapKeys rename keys', () => {
    const obj = aobj.mapKeys({a:1,b:2}, (key) => {
        if(key == 'a') return 'b';
        if(key == 'b') return 'c';
        return key;
    });
    expect(Object.keys(obj)).toStrictEqual(['b', 'c']);
})

test('Test mapValues add 1 to each value', () => {
    const obj = aobj.mapValues({a:1, b:2}, (value) => {
        value += 1;
        return value;
    });
    expect(obj.a).toBe(2);
})

test('Test traverse Deep nested Object', () => {
    const obj = aobj.traverse({a:1,b:{c: 2}}, (key, value) => {
        return { key, value: value + 1 };
    });
    expect(obj.b.c).toBe(3);
})

test('Test traverseKeys Deep nested Object', () => {
    const obj = aobj.traverseKeys({a:1,b:{c: 2}}, (key) => {
        if(key == 'c') return 'deep_c';
        return key;
    });
    expect(obj.b.deep_c).toBe(2);
})

test('Test traverseValues Deep nested Object', () => {
    const obj = aobj.traverseValues({a:1,b:{c: 2}}, (value) => {
        value += 1;
        return value;
    });
    expect(obj.b.c).toBe(3);
})

test('Invert key/values {a: "b"} => {b: "a"}', () => {
    const obj = aobj.invert({a:"b"});
    expect(obj.b).toBe("a");
})

test("Extract Default, {a: 1} => {a: '', b: ''} => {a: 1, b: ''}", () => {
    const obj = aobj.extractDefault({a:1}, {a: '', b: ''})
    expect(obj.b).toBe('');
})