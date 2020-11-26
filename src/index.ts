export default {
    map(obj = {}, action = (key, value) => {return {key, value}}) {
        let newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                let {key: newKey, value: newValue} = action(key, obj[key]);
                newObj[newKey] = newValue;
            }
        }
        return newObj;
    },

    mapValues(obj = {}, action = (value) => {return value}) {
        let newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = action(obj[key]);
            }
        }
        return newObj;
    },

    mapKeys(obj = {}, action = (key) => {return key}) {
        let newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                let newKey = action(key);
                newObj[newKey] = obj[key];
            }
        }
        return newObj;
    },

    traverse(obj = {}, action = (key, value) => {return {key, value}}) {
        let newObj = {};
        for (const key in obj) {
            const {key: newKey, value: newValue} = action(key, obj[key]);
            newObj[newKey] = this.isObject(obj[key]) ? this.traverse(obj[key], action) : newValue;
        }
        return newObj;
    },

    traverseKeys(obj = {}, action = (key) => {return key}) {
        let newObj = {};
        for (const key in obj) {
            const newKey = action(key);
            newObj[newKey] = this.isObject(obj[key]) ? this.traverseKeys(obj[key], action) : obj[key];
        }
        return newObj;
    },

    traverseValues(obj = {}, action = (value) => {return value}) {
        let newObj = {};
        for (const key in obj) {
            const newValue = action(obj[key]);
            newObj[key] = this.isObject(obj[key]) ? this.traverseValues(obj[key], action) : newValue;
        }
        return newObj;
    },

    extract(obj = {}, keys = [] || '') {
        if(typeof keys == 'string') keys = [keys];
        return Object.keys(obj)
            .filter(function (key) {
                return keys.indexOf(key) >= 0;
            })
            .reduce(function (obj2, key) {
                obj2[key] = obj[key];
                return obj2;
            }, {});
    },

    extractDefault(obj = {}, keys = {}) {
        return {...keys, ...this.extract(obj, Object.keys(keys))};
    },

    has(obj, properties = [] || '') {
        if(typeof properties == 'string')
            return Reflect.has(obj, properties);

        for (const prop of properties) {
            if (!Reflect.has(obj, prop)) {
                return false;
            }
        }
        return true;
    },

    isEmpty(obj = {}) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },

    isObject(obj = {}) {
        const typesNotAllowed = ['string','number', 'boolean', 'symbol', 'bigint', 'function'];
        const emptyValues = [undefined, null];

        return !(typesNotAllowed.indexOf(typeof obj) !== -1 ||
            emptyValues.indexOf(obj) !== -1 ||
            obj instanceof Array ||
            ( !obj || toString.call( obj ) !== "[object Object]" ) ||
            !(obj instanceof Object)
        );
    },

    clone(obj = {}) {
        if (typeof obj !== 'object' || obj === null) return obj;
        let newObj, i;
        if (obj instanceof Array) {
            let l;
            newObj = [];
            for (i = 0, l = obj.length; i < l; i++) newObj[i] = this.clone(obj[i]);
            return newObj;
        }
        newObj = {};
        for (i in obj) if (obj.hasOwnProperty(i)) newObj[i] = this.clone(obj[i]);
        return newObj;
    },

    deepFilter(obj = {}, filter = (key, value) => {return (true || false)}) {
        let newObj = {};
        for (const key in obj) {
            if(filter(key, obj[key])) {
                newObj[key] = this.isObject(obj[key]) ? this.deepFilter(obj[key], filter) : obj[key];
            }
        }
        return newObj;
    },

    deepFilterKeys(obj = {}, filter = (key) => {return (true || false)}) {
        let newObj = {};
        for (const key in obj) {
            if(filter(key)) {
                newObj[key] = this.isObject(obj[key]) ? this.deepFilterKeys(obj[key], filter) : obj[key];
            }
        }
        return newObj;
    },

    deepFilterValues(obj = {}, filter = (value) => {return (true || false)}) {
        let newObj = {};
        for (const key in obj) {
            if(filter(obj[key])) {
                newObj[key] = this.isObject(obj[key]) ? this.deepFilterValues(obj[key], filter) : obj[key];
            }
        }
        return newObj;
    },

    filter(obj = {}, filter = (key, value) => {return (true || false)}) {
        let newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(filter(key, obj[key])){
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    },

    filterKeys(obj = {}, filter = (key) => {return (true || false)}) {
        let newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(filter(key)){
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    },

    filterValues(obj = {}, filter = (value) => {return (true || false)}) {
        let newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(filter(key)){
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    },

    invert(obj = {}) {
        return this.map(obj, (key, value) => {
            if(typeof key !== 'string' && typeof key !== 'number') return {key, value};
            if(typeof value !== 'string' && typeof value !== 'number') return {key, value};
            return {key: value, value: key};
        })
    }
}
