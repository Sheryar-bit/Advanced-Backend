const receivedChunks = [];
let receivedSize = 0;

channel.onmessage = (event) => {
  receivedChunks.push(event.data);
  receivedSize += event.data.byteLength;

  console.log("Received:", receivedSize);
};

// After transfer
const fileBlob = new Blob(receivedChunks);
const downloadUrl = URL.createObjectURL(fileBlob);
