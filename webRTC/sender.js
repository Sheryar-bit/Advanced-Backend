// Browser to Browser

// Create peer connection
const pc = new RTCPeerConnection();

// Create data channel
const channel = pc.createDataChannel("file-transfer");

// Send file in chunks
channel.onopen = () => {
  const file = document.querySelector("input").files[0];
  const chunkSize = 16 * 1024; // 16 KB
  let offset = 0;

  const reader = new FileReader();

  reader.onload = () => {
    channel.send(reader.result);
    offset += reader.result.byteLength;

    if (offset < file.size) {
      readSlice(offset);
    }
  };

  function readSlice(o) {
    reader.readAsArrayBuffer(file.slice(o, o + chunkSize));
  }

  readSlice(0);
};
