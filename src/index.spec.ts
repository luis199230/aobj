import tsObject from "./index";

describe('test for methods index', () => {
    it('Check if {} Object is empty', () => {
        const isEmpty = tsObject.isEmpty({});
        expect(isEmpty).toBe(true);
    });

    it('Check if {a: 1} Object is empty', () => {
        const isEmpty = tsObject.isEmpty({a: 1});
        expect(isEmpty).toBe(false);
    })

    it('Check if {} is Object', () => {
        const isObject = tsObject.isObject({});
        expect(isObject).toBe(true);
    })


    it('Check if {a: 1} is Object', () => {
        const isObject = tsObject.isObject({a: 1});
        expect(isObject).toBe(true);
    })

    it('Check if Array is Object', () => {
        const isObject = tsObject.isObject([1,2,3]);
        expect(isObject).toBe(false);
    })

    it('Check if new Number is Object', () => {
        const isObject = tsObject.isObject(new Number(1));
        expect(isObject).toBe(false);
    })

    it('Check Object Clone {a: 1}', () => {
        const a = {a: 1};
        const b = tsObject.clone(a);
        b.a = 2;
        expect(a.a).toBe(1);
    })

    it('Check Deep Object Clone {a: {b: {c: 1}}}', () => {
        const a = {a: {b: {c: 1}}};
        const b = tsObject.clone(a);
        b.a.b.c = 2;
        expect(a.a.b.c).toBe(1);
    })

    it('Test map {a: 1, b: 2} + 1 is {a: 2, b: 3}', () => {
        const obj = tsObject.map({a:1,b:2}, (key, value) => {
            return { key, value: value + 1 };
        });
        expect(obj['a']).toBe(2);
    })


    it('Test mapKeys rename keys', () => {
        const obj = tsObject.mapKeys({a:1,b:2}, (key) => {
            if(key == 'a') return 'b';
            if(key == 'b') return 'c';
            return key;
        });
        expect(Object.keys(obj)).toStrictEqual(['b', 'c']);
    })

    it('Test mapValues add 1 to each value', () => {
        const obj = tsObject.mapValues({a:1, b:2}, (value) => {
            value += 1;
            return value;
        });
        expect(obj['a']).toBe(2);
    })

    it('Test traverse Deep nested Object', () => {
        const obj = tsObject.traverse({a:1,b:{c: 2}}, (key, value) => {
            return { key, value: value + 1 };
        });
        expect(obj['b'].c).toBe(3);
    })

    it('Test traverseKeys Deep nested Object', () => {
        const obj = tsObject.traverseKeys({a:1,b:{c: 2}}, (key) => {
            if(key == 'c') return 'deep_c';
            return key;
        });
        expect(obj['b'].deep_c).toBe(2);
    })

    it('Test traverseValues Deep nested Object', () => {
        const obj = tsObject.traverseValues({a:1,b:{c: 2}}, (value) => {
            value += 1;
            return value;
        });
        expect(obj['b'].c).toBe(3);
    })

    it('Invert key/values {a: "b"} => {b: "a"}', () => {
        const obj = tsObject.invert({a:"b"});
        expect(obj.b).toBe("a");
    })

    it("Extract Default, {a: 1} => {a: '', b: ''} => {a: 1, b: ''}", () => {
        const obj = tsObject.extractDefault({a:1}, {a: '', b: ''})
        expect(obj.b).toBe('');
    })

    it("Extract Default, {a: 1, b:2, c:4} => ['a', 'c'] => {a:1,c:4}", () => {
        const obj = tsObject.extract({a: 1, b:2, c:4}, ['a','c'])
        expect(obj['b']).toBeFalsy();
        expect(obj['a']).toBe(1);
        expect(obj['c']).toBe(4);
    })
});
