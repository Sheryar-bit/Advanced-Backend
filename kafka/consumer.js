const { Partitioners } = require("kafkajs");
const {} =require("./admin")

async function init() {
    const consumer=Kafka.consumer({ groupId: "user-1"})
    await consumer.connect();

    await consumer.subscribe({ topics: ['order-updates'] })

    await consumer.run({
        eachMessage: async ({topics, Partitioners, message}) =>{
            console.log(`[${topics}]: PART:${Partitioners}: ${message.toString()}`)
        }
    })

    // await consumer.disconnect()
}

init()