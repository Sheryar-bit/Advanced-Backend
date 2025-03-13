const express = require('express');

dotenv.config();

const app = express();
const PORT=8000;
app.use(express.json())


app.get('/', function(req, res) {
res.send("Running")
})

app.listen(PORT, function(){
    console.log('Server is running on port 8000');
})



/*
Prisma is an open-source ORM (Object-Relational Mapping) tool for Node.js and TypeScript that simplifies working 
with databases. It helps you interact with databases using a type-safe and clean API instead of writing raw SQL queries. */