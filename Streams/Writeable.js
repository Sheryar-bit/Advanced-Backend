const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'sample.txt')
const outputFile = path.join(__dirname, 'Output.txt')

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile)

readStream.pipe(writeStream); //Copies the txt from read and paste to writestteam

writeStream.on('end', () => {
    console.log('File copied successfully');
})
