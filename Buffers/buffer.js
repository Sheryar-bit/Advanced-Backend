/*
In Node.js, buffers are used to handle binary data directly, especially when dealing with files, streams, or network protocols. 
Since JavaScript (in browsers and Node.js) uses UTF-16 strings, it can't natively handle raw binary data efficiently. 
Buffers fill this gap by providing a way to work with binary data.
*/

const buffOne = Buffer.alloc(10); //allocates a buffer to 10 bytes
console.log(buffOne);

//Buffer from strings
const bufferfromStrung = Buffer.from("hello")
console.log(bufferfromStrung);

//buffer from Arrays:
const bufferfromArray = Buffer.from([72, 101, 108, 108,]);
console.log(bufferfromArray);



buffOne.write("Node JS");
console.log('After writing NodeJS we get => ', buffOne.toString()); // prints: Node JS


//reading single byte from any buffer:
console.log(bufferfromStrung[0]);

//concat:
const bufferConcat = Buffer.concat([buffOne, bufferfromStrung]);
console.log(bufferConcat.toString() );
