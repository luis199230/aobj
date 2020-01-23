module.exports = {

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
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

}