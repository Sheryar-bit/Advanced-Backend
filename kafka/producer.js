const { Partitioners } = require("kafkajs");
const {kafka} = require("./admin")

async function init() {
    const producer=kafka.producer();

    console.log("Connecting Browerx")
    await producer.connect();
    console.log("producer connected successffuly")
 
    await producer.send({
        topic: 'order-updates',
        messages: [
            {
                Partitioners: 0,
                key: 'location-upadte', 
                value: JSON.stringify({
                    name: "Pasta", loc: "Dolmenmall"
                })}
        ]
    });

    await producer.disconnect()
}

init()