const  redis = require('ioredis')
require('dotenv').config();

const redisClient = new redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

//Making Redis Connectiom:
(
    async function () {
    redisClient.on('error',function(err) {
        console.log('Redis connection error:', err);
    });
    redisClient.on('connect',function(){
        console.log('Redis connection established');
    });

    // await redisClient.connect();
    await redisClient.ping();
}

)
();

//getting a key value
const getValue = async function(key) {
    try {
        const value = await redisClient.json.get(`user: ${key}`);
        return value;
    }catch(err) {
        console.log('Error while getting the Value!', err);
    }
}


//setting a value that takes a key and a val
const setValue = async function (key, value) {
    try{
        const data = await redisClient.json.set(`user: ${key}`, value);
        return data;
    }catch(err) {
        console.log('Error while settinh the Value!', err);
    }
}


module.exports={
    getValue,
    setValue
}