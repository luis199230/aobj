const aobj = require('./index');

aobj.traverseRecursive({
    fields: [
        {name: 'asd'},
        {name: 'asdqqq'},
        {name: 'asdee'},
        {name: 'asdww'},
        {name: 'asdaa'},
        {name: 'asdasd'}
    ]
}, (key, value) => {
    console.log("f", key, value);
    return {key, value};
})