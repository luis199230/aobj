export const map = (obj = {}, action = (key, value) => {
  return {key, value}
}) => {
  let newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let {key: newKey, value: newValue} = action(key, obj[key]);
      newObj[newKey] = newValue;
    }
  }
  return newObj;
};

export const mapArray = (obj = {}, action = (key, value) => {
  return {key, value}
}) => {
  let newArray = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArray.push(action(key, obj[key]));
    }
  }
  return newArray;
};

export const mapValues = (obj = {}, action = (value) => {
  return value
}) => {
  let newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = action(obj[key]);
    }
  }
  return newObj;
};

export const mapKeys = (obj = {}, action = (key) => {
  return key
}) => {
  let newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = action(key);
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
};

export const traverse = (obj = {}, action = (key, value) => {
  return {key, value}
}) => {
  let newObj = {};
  for (const key in obj) {
    const {key: newKey, value: newValue} = action(key, obj[key]);
    newObj[newKey] = isObject(obj[key]) ? traverse(obj[key], action) : newValue;
  }
  return newObj;
};

export const traverseKeys = (obj = {}, action = (key) => {
  return key
}) => {
  let newObj = {};
  for (const key in obj) {
    const newKey = action(key);
    newObj[newKey] = isObject(obj[key]) ? traverseKeys(obj[key], action) : obj[key];
  }
  return newObj;
};

export const traverseValues = (obj = {}, action = (value) => {
  return value
}) => {
  let newObj = {};
  for (const key in obj) {
    const newValue = action(obj[key]);
    newObj[key] = isObject(obj[key]) ? traverseValues(obj[key], action) : newValue;
  }
  return newObj;
};

export const extract = (obj = {}, keys = [] || '') => {
  if (typeof keys == 'string') keys = [keys];
  return Object.keys(obj)
    .filter(function (key) {
      return keys.indexOf(key) >= 0;
    })
    .reduce(function (obj2, key) {
      obj2[key] = obj[key];
      return obj2;
    }, {});
};

export const extractDefault = (obj = {}, keys = {}) => {
  return {...keys, ...extract(obj, Object.keys(keys))};
};

export const has = (obj, properties = [] || '') => {
  if (typeof properties == 'string')
    return Reflect.has(obj, properties);

  for (const prop of properties) {
    if (!Reflect.has(obj, prop)) {
      return false;
    }
  }
  return true;
};

export const isEmpty = (obj = {}) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export const isObject = (obj = {}) => {
  const typesNotAllowed = ['string', 'number', 'boolean', 'symbol', 'bigint', 'function'];
  const emptyValues = [undefined, null];

  return !(typesNotAllowed.indexOf(typeof obj) !== -1 ||
    emptyValues.indexOf(obj) !== -1 ||
    obj instanceof Array ||
    (!obj || toString.call(obj) !== "[object Object]") ||
    !(obj instanceof Object)
  );
};

export const clone = (obj = {}) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  let newObj, i;
  if (obj instanceof Array) {
    let l;
    newObj = [];
    for (i = 0, l = obj.length; i < l; i++) newObj[i] = clone(obj[i]);
    return newObj;
  }
  newObj = {};
  for (i in obj) if (obj.hasOwnProperty(i)) newObj[i] = clone(obj[i]);
  return newObj;
};

export const deepFilter = (obj = {}, filter = (key, value) => {
  return (true || false)
}) => {
  let newObj = {};
  for (const key in obj) {
    if (filter(key, obj[key])) {
      newObj[key] = isObject(obj[key]) ? deepFilter(obj[key], filter) : obj[key];
    }
  }
  return newObj;
};

export const deepFilterKeys = (obj = {}, filter = (key) => {
  return (true || false)
}) => {
  let newObj = {};
  for (const key in obj) {
    if (filter(key)) {
      newObj[key] = isObject(obj[key]) ? deepFilterKeys(obj[key], filter) : obj[key];
    }
  }
  return newObj;
};

export const deepFilterValues = (obj = {}, filter = (value) => {
  return (true || false)
}) => {
  let newObj = {};
  for (const key in obj) {
    if (filter(obj[key])) {
      newObj[key] = isObject(obj[key]) ? deepFilterValues(obj[key], filter) : obj[key];
    }
  }
  return newObj;
};

export const filter = (obj = {}, filter = (key, value) => {
  return (true || false)
}) => {
  let newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (filter(key, obj[key])) {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};

export const filterKeys = (obj = {}, filter = (key) => {
  return (true || false)
}) => {
  let newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (filter(key)) {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};

export const filterValues = (obj = {}, filter = (value) => {
  return (true || false)
}) => {
  let newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (filter(key)) {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};

export const invert = (obj = {}) => {
  return map(obj, (key, value) => {
    if (typeof key !== 'string' && typeof key !== 'number') return {key, value};
    if (typeof value !== 'string' && typeof value !== 'number') return {key, value};
    return {key: value, value: key};
  })
};

export const join = (obj = {}, glue = ','): string => {
  const newArray = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArray.push(obj[key]);
    }
  }
  return newArray.join(glue);
};

export default {
  map,
  mapArray,
  mapValues,
  mapKeys,
  traverse,
  traverseKeys,
  traverseValues,
  extract,
  extractDefault,
  has,
  isEmpty,
  isObject,
  clone,
  deepFilter,
  deepFilterKeys,
  deepFilterValues,
  filter,
  filterKeys,
  filterValues,
  invert,
  join,
};
