// const {Kafka} = require("kafka")
// const {kafka} = require("kafka")
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientID: "MyApp",
    brokers: ("http://192.168.100.82")
});

async function init() {
    const admin = kafka.admin()
    console.log("Admin Connecting>>");
    admin.connect();
    console.log("Succes..")

    console.log("Order upadtes");
    admin.createTopics({
        topics: [
            {
                topic: 'order-updated',
                numPartions:2,
            }
        ]
    });
    
console.log("Topics Created!! ");

console.log("Disconnecting Adminnnnn")
await admin.disconnect();
}

// console.log("Topics Created!! ");

// console.log("Disconnecting Adminnnnn")
// await admin.disconnect();

init()


// console.log("")


