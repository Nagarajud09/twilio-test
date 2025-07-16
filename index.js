const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const twilio = require("twilio");


app.post('/twilio/inbound', (req, res) => {
    console.log("=========================== }");

    const twiml = new twilio.twiml.VoiceResponse();

    twiml.say('Connecting to Runo user.');

    const dial = twiml.dial({
        action: "https://webhook.site/15cec1d8-7693-4962-b823-d02e614e608d",
    });

    const called_number = req.query.phoneNumber;
    dial.number(called_number);

    // send response to Twilio
    res.type('text/xml');
    res.send(twiml.toString());
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Runo custom IVR server listening on port ${PORT}`);
});
