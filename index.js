const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const twilio = require("twilio");


app.get('/twilio/inbound', (req, res) => {

  const twiml = new twilio.twiml.VoiceResponse(); 
  console.log("=========================== }");

  twiml.say('Almost connecting to Runo user.');
  const dial = twiml.dial({
    action: "https://webhook.site/9cf191f8-5f0b-41a9-9bd1-429435c4a59c",
  });
  const called_number = req.query.phoneNumber;
  dial.number(called_number);


});

app.listen(PORT, () => {
  console.log(`Runo custom IVR server listening on port ${PORT}`);
});
