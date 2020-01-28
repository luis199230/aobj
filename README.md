# aobj
AOBJ is
an Object Manipulation Module for Nodejs

# Setup
Install in your project using npm
> npm install aobj

Require in your file as
````javascript
const aobj = require('aobj');
````
# Methods

## extract
*extract(obj: Object, keys: Array\<String>) :Object*

Extract keys/value into a new Object

````javascript
const person = {name: 'Donald', lastname: 'Trump', favorite_color: 'red'}

aobj.extract(person, ['name', 'lastname'])
// {name: 'Donald', lastname: 'Trump'}
````

## has
*has(obj: Object, keys: Array\<String>) :Boolean*

Check if an Object has certain keys

````javascript
const person = {name: 'Donald', lastname: 'Trump', favorite_color: 'red'}

aobj.has(person, 'lastname') // true
aobj.has(person, ['name', 'lastname']) // true
aobj.has(person, ['name', 'lastname', 'age']) // false
````

## clone
*clone(obj: Object) :Object*

Deep Clones an Object

Without Cloning
````javascript
const person = {name: 'Donald', lastname: 'Trump', favorite_color: 'red'}

const samePerson = person;
samePerson.name = 'Mike';

samePerson.name; // 'Mike'
person.name; // 'Mike'
````

With Deep Cloning
````javascript
const person = {name: 'Donald', lastname: 'Trump', favorite_color: 'red'}

const anotherPerson = aobj.clone(person);
anotherPerson.name = 'Mike';

anotherPerson.name; // 'Mike'
person.name; // 'Donald'
````

## isEmpty
*isEmpty(obj: Object) :Boolean*

Check if an Object is empty

````javascript
const person = {name: 'Donald', lastname: 'Trump', favorite_color: 'red'}

aobj.isEmpty({}) // true

aobj.isEmpty(person) // false
````

## isObject
*isObject(obj: Object) :Boolean*

Check if a variable is an Object

````javascript
const person = {name: 'Donald', lastname: 'Trump', favorite_color: 'red'}

aobj.isObject(person) // true
aobj.isObject({}) // true

aobj.isObject('') // false
aobj.isObject(new Number(1)) // false
aobj.isObject(undefined) // false
aobj.isObject(null) // false
````

## map
*map(obj: Object, action: (key: String, value: any) => { key: String; value: any; })) :Object*

Like Array.map for Objects
(For deep objects use traverse)

````javascript
const person = {
    name: 'Donald',
    age: 10
}

const newPerson = aobj.map(person, (key, value) => {
    if(key == 'age'){
        key = 'birthyear';
        value = 2020 - age;
    }
    return { key, value };
});

console.log(newPerson);
/*
{
    name: 'Donald',
    birthyear: 2010
}
*/
````

## mapKeys
*mapKeys(obj: Object, action: (key: String) => key: String)) :Object*

Like Array.map for Objects Keys
(For deep objects use traverseKeys)

````javascript
const person = {
    name: 'Donald',
    age: 10
}

const newPerson = aobj.map(person, (key) => {
    if(key == 'name') key = 'fullname';
    return key;
});

console.log(newPerson);
/*
{
    fullname: 'Donald',
    birthyear: 2010
}
*/
````

## mapValues
*mapValues(obj: Object, action: (value: any) => value: any)) :Object*

Like Array.map for Objects Values
(For deep objects use traverse)

````javascript
const person = {
    name: 'Donald',
    age: 10
}

const newPerson = aobj.mapValues(person, (value) => {
    if(typeof value == 'number') value += 50;
    return value;
});

console.log(newPerson);
/*
{
    name: 'Donald',
    age: 60
}
*/
````

## traverse
*traverse(obj: Object, action: (key: String, value: any) => { key: String; value: any; })) :Object*

Like map but for deeply nested objects

````javascript
const house = {
    rooms: {
        dinner_room: {
            m2: 30,
            chairs: {
                oldChair: {
                    m2: 0.2,
                    age: 5
                }
            }
        },
        bedroom: {
            m2: 30,
            gamerChair: {
                m2: 0.23,
                age: 1
            }
        }
    }
}

const newPerson = aobj.traverse(person, (key, value) => {
    if(key == 'age'){
        key = 'year';
        value = 2020 - age;
    }
    return { key, value };
});

console.log(newPerson);
/*
{
    rooms: {
        dinner_room: {
            m2: 30,
            chairs: {
                oldChair: {
                    m2: 0.2,
                    year: 2015
                }
            }
        },
        bedroom: {
            m2: 30,
            gamerChair: {
                m2: 0.23,
                year: 2019
            }
        }
    }
}
*/
````

## traverseKeys
*traverseKeys(obj: Object, action: (key: String) => key: String)) :Object*

Like map but for deeply nested objects

````javascript
const house = {
    rooms: {
        a: {
            m2: 120
        },
        b: {
            m2: 112
        },
        c: {
            m2: 117
        }
    }
}

const newPerson = aobj.traverseKeys(person, (key) => {
    if(key == 'a') key = 'Biggest_room';
    if(key == 'b') key = 'Small_room';
    if(key == 'c') key = 'Medium_room';
    return key;
});

console.log(newPerson);
/*
{
    rooms: {
        Biggest_room: {
            m2: 120
        },
        Small_room: {
            m2: 112
        },
        Medium_room: {
            m2: 117
        }
    }
}
*/
````

## traverseValues
*traverseValues(obj: Object, action: (value: String) => value: String)) :Object*

Like map but for deeply nested objects

````javascript
const house = {
    rooms: {
        a: {
            m2: 120
        },
        b: {
            m2: 112
        },
        c: {
            m2: 117
        }
    }
}

const newPerson = aobj.traverseValues(person, (value) => {
    return value + 100;
});

console.log(newPerson);
/*
{
    rooms: {
        a: {
            m2: 220
        },
        b: {
            m2: 212
        },
        c: {
            m2: 217
        }
    }
}
*/
````

## TODO:

### Tests for: 

- [ ] deepFilter
- [ ] deepFilterKeys
- [ ] deepFilterValues
- [ ] filter
- [ ] filterKeys
- [ ] filterValues

### Examples for: 

- [ ] deepFilter
- [ ] deepFilterKeys
- [ ] deepFilterValues
- [ ] filter
- [ ] filterKeys
- [ ] filterValues
- [ ] invert
- [ ] extractDefault