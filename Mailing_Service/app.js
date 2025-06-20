const express = require('express');
require('dotenv').config();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const Mail = require('./mail');

const app = express();
app.use(bodyparser.json())


app.post('/send-email', async (req, res) => {

    const { to, subject, message } = req.body;
    try{
        await new Mail()
        .setTo(to)
        .setSubject(subject)
        .setText(message)
        .setHtml(`<p>${message}</p>`)
        .setAttachments([
        {
          filename: 'Lab_09(1).pdf',
          content: 'Testing attachments!'
        }
      ])
        .send();

    }catch(error) {
        console.log('Error sending email:', error);
        return res.status(500).send('Error sending email');
    }
});

app.get('/', (req, res) => {
    res.send('Mailing Service is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});