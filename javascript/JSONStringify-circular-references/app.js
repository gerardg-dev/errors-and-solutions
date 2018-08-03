console.log('JSON.stringify() Circular Reference Error');

/*
Circular structure error occurs when you have a property of the object which is
the object itself directly (a -> a) or indirectly (a -> b -> a).

To avoid the error message, tell JSON.stringify what to do when it encounters a
circular reference. For example, if you have a person pointing to another person
("parent"), which may (or may not) point to the original person,
do the following:

JSON.stringify( that.person, function( key, value) {
  if( key == 'parent') { return value.id;}
  else {return value;}
})

The second parameter to stringify is a filter function. Here it simply converts
the referred object to its ID, but you are free to do whatever you like to break
the circular reference.
*/

// You can test the above code with the following:

function Person( params) {
  this.id = params['id'];
  this.name = params['name'];
  this.father = null;
  this.fingers = [];
  // etc.
}

var me = new Person({ id: 1, name: 'Luke'});
var him = new Person( { id:2, name: 'Darth Vader'});

me.father = him;

// so far so good
console.log(JSON.stringify(me));

// time travel assumed :-)
him.father = me;

// "TypeError: Converting circular structure to JSON"
// console.log(JSON.stringify(me));

// But this should do the job:
let thisWorks = JSON.stringify(me, function( key, value) {
  if(key == 'father') {
    return value.id;
  } else {
    return value;
  };
});
console.log(thisWorks);

/*
SOURCES:
https://stackoverflow.com/questions/10392293/stringify-convert-to-json-a-javascript-object-with-circular-reference
*/
