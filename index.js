const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const twilio = require("twilio");
const bodyParser = require('body-parser');


//const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/twilio/inbound', (req, res) => {
    console.log("=========================== }");

    const twiml = new twilio.twiml.VoiceResponse();

    twiml.say('Connecting to Runo user.');
    const callerId = req.query.callerId

    const dial = twiml.dial({
        callerId: callerId,
        record: "record-from-answer-dual",
        recordingStatusCallback: "https://webhook.site/514d1167-dc77-43cf-8ad1-f75c86271573",
        recordingStatusCallbackMethod: "POST",
        recordingStatusCallbackEvent: ["completed"],
    });

    const called_number = req.query.phoneNumber;
    dial.number({
        statusCallback: "https://webhook.site/514d1167-dc77-43cf-8ad1-f75c86271573?event=customer",
        statusCallbackEvent: ["answered", "completed", "initiated", "ringing"],
        statusCallbackMethod: "POST"
    }, called_number);

    // send response to Twilio
    res.type('text/xml');
    const abc = res.send(twiml.toString());
    console.log(abc)
});
const twilioPhoneNumber = '+13167106323';
const customerNumber = '+917008284181';
// Endpoint to initiate call
app.get('/start-call', async (req, res) => {
    try {
        const call = await client.calls.create({
            url: 'https://twilio-test-agk5.onrender.com/twilio/inbound?phoneNumber=+919573889142',
            to: customerNumber,
            from: twilioPhoneNumber,
            record: true,
            callReason: "Testing for the first time.",
            statusCallback: "https://webhook.site/15cec1d8-7693-4962-b823-d02e614e608d",
            statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
            recordingStatusCallback: "https://webhook.site/1baaacd9-d96b-4914-99dc-829b00519ddb",
            recordingStatusCallbackMethod: "POST",
            recordingStatusCallbackEvents: ["in-progress", "completed", "absent"],
        });

        console.log('Call initiated, SID:', call.sid);
        res.send('Call initiated, SID: ' + call.sid);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error initiating call.');
    }
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Runo custom IVR server listening on port ${PORT}`);
});
