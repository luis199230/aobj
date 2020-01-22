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

## isEmpty
*isEmpty(obj: Object) :Boolean*

Check if an Object is empty

````javascript
const person = {name: 'Donald', lastname: 'Trump', favorite_color: 'red'}

aobj.isEmpty(person) // false

aobj.isEmpty({}) // true
````

