const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();
const axios = require('axios');
const multer = require('multer');
// Function to dynamically import Gradio Client
const importGradioClient = async () => {
  const { Client } = await import('@gradio/client');
  return Client;
};
(async () => {
  const fetch = await import('node-fetch');
  
})();
const fs = require('fs');


app.use(express.json());
app.use(cors());

app.use(cors({ origin: 'https://speakify-ecru.vercel.app/' }));
app.use(bodyParser.json());




// AWS SDK Configuration
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,  // Replace with your Access Key
  secretAccessKey: process.env.SECRET_ACCESS_KEY,  // Replace with your Secret Key
  region:"us-east-1"  // Replace with your AWS Region
});


// Translation endpoint
app.post('/translate', (req, res) => {
  const { sourceText, sourceLanguage,targetLanguage } = req.body;

  // Create a Translate service object
  const translate = new AWS.Translate();

  // Parameters for the translation request
  const params = {
    Text: sourceText, // Ensure you provide the 'Text' parameter
    TargetLanguageCode: targetLanguage,
    SourceLanguageCode: sourceLanguage
  };

  // Call the translateText function from the AWS SDK
  translate.translateText(params, (err, data) => {
    if (err) {
      console.error('Error translating text:', err);
      return res.status(500).json({ error: 'Translation failed' });
    }
    res.json({ translatedText: data.TranslatedText });
  });
});


const polly = new AWS.Polly();

app.post('/synthesize', async (req, res) => {
  const { text, voiceId } = req.body;

  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: voiceId || 'Joanna', // Default to Joanna if no voiceId provided
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="speech.mp3"',
    });
    res.send(data.AudioStream);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).json({ error: 'Error synthesizing speech' });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


// Function to handle audio file processing and transcription using Gradio Whisper API
const processAudioWithWhisper = async (audioBuffer) => {
  try {
    // Dynamically import and connect to the Whisper API via Gradio client
    const Client = await importGradioClient();
    const client = await Client.connect("aakshkr10/openai-whisper-large-v3-turbo");

    // Predict the transcription by sending the audio buffer to the Whisper API
    const result = await client.predict("/predict", {
      param_0: audioBuffer, // Send the audio buffer to the API
    });

    return result.data; // Return the transcription result
  } catch (error) {
    console.error("Error processing audio with Whisper:", error);
    throw new Error("Error processing audio with Whisper");
  }
};

// Endpoint to process an uploaded audio file for transcription
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file provided' });
  }

  console.log("Received file:", req.file);
  try {
    // Process the audio file buffer using Whisper
    const transcription = await processAudioWithWhisper(req.file.buffer);
    res.status(200).json({ transcription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));

