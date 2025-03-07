/*In Node.js, a stream is like a pipeline that allows you to read or write data piece by piece instead of all at once. T
 his is useful when working with large files or real-time data because it’s faster and uses less memory.

 Imagine This:
Without streams: You want to drink water from a bottle, so you pour all the water into a glass first (loading everything at once).
With streams: You drink directly from the bottle, sip by sip (handling data in small chunks).
 */

//Readable => used for reading
//Writable => used for writing
//Duplex => used for both reading and writing
//Transform => used for modifying data while reading or writing


const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'sample.txt')

const readStream = fs.createReadStream(inputFile);

readStream.on('data', function(chunk) {
    console.log('Data Received! ',chunk.toString());
})

readStream.on('end', function() {
    console.log('End of file reached');
})

readStream.on('error', function(error) {
    console.log('Error Occured', error);
})

