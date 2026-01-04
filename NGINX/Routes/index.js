var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log('comijng....');
    res.json({ instanceId: process.env.INSTANCE_ID });
});

module.exports = router;