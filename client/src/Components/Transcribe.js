import React, { useState } from 'react';
import axios from 'axios';
import Howitworks from "./Howitworks.js";
import Faq from './Faq.js';
import Footer from './Footer.js';
import Progressbar from './Progressbar.js';  // Import the ProgressBar component

const Transcribe = () => {
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const content = [
    {
      title: "Upload Your Audio",
      desc: "Drag and drop or click to upload your audio file in supported formats.",
    },
    {
      title: "Process the Transcription",
      desc: "Submit your audio file, and our system will automatically transcribe it for you.",
    },
    {
      title: "Download or View the Output",
      desc: "Access the transcription directly on the screen or download it for your use.",
    },
  ];

  const transcribeFaq = [
    {
      question: "What is audio transcription?",
      answer: "Audio transcription converts spoken words from audio files into written text using AI-driven speech recognition technology."
    },
    {
      question: "What file formats are supported for transcription?",
      answer: "Common formats like MP3, WAV, and FLAC are supported."
    },
    {
      question: "How accurate is the transcription?",
      answer: "Accuracy depends on audio quality, speaker clarity, and background noise."
    },
    {
      question: "Can it handle multiple speakers?",
      answer: "No, it cannot differentiate between speakers and label their dialogues accurately."
    },
    {
      question: "Does it support multiple languages?",
      answer: "Yes, it can support multiple languages and can identify and transcribe them accordingly."
    },
    {
      question: "Is the transcription process secure?",
      answer: "We can ensure data security with encryption and do not store your audio or transcription data without permission."
    }
  ];

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
    setTranscription('');
    setError('');
  };

  const handleClear = () => {
    setAudioFile(null);
    setTranscription('');
    setError('');
  };

  const handleTranscription = async () => {
    setProgress(20);
    if (!audioFile) {
      setError('Please upload an audio file first.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/transcribe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (Array.isArray(response.data.transcription)) {
        const match = response.data.transcription[0].match(/text=["'](.*?)["']/);
        setTranscription(match ? match[1] : 'Transcription unavailable');
        setProgress(100);
      } else {
        setTranscription('Transcription unavailable');
      }

      setError('');
    } catch (err) {
      setError('Error processing the audio file.');
      console.error(err);
      setProgress(0);
    } finally {
      setTimeout(() => setProgress(0), 1000); // Hide progress after delay
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([transcription], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcription.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <Progressbar progress={progress} /> {/* Add the Progressbar here */}
      <div className="flex flex-col lg:flex-row justify-center items-start p-4 bg-gray-100">
        {/* Left Div: File Upload */}
        <div className="w-full lg:w-5/12 bg-white shadow-md rounded-lg p-4 m-2">
          <h2 className="text-xl font-semibold mb-4 text-center">Upload Audio</h2>
          <div
            className="border-dashed border-2 border-gray-400 rounded-lg h-[200px] flex items-center justify-center mb-4 cursor-pointer"
            onClick={() => document.getElementById('audioFileInput').click()}
          >
            {audioFile ? (
              <p className="text-sm text-gray-600">{audioFile.name}</p>
            ) : (
              <p className="text-sm text-gray-600">Drag and drop or click to upload a file</p>
            )}
          </div>
          <input
            type="file"
            id="audioFileInput"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col sm:flex-row justify-between mt-4">
            <button
              onClick={handleTranscription}
              className="w-full sm:w-1/2 sm:mr-2 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              onClick={handleClear}
              className="w-full sm:w-1/2 sm:ml-2 mt-2 sm:mt-0 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>

        {/* Right Div: Output */}
        <div className="w-full lg:w-5/12 bg-white shadow-md rounded-lg p-4 m-2">
          <h2 className="text-xl font-semibold mb-4 text-center">Transcription Output</h2>
          <div className="h-[150px] border border-gray-300 rounded-lg p-4 overflow-auto bg-gray-100">
            {transcription ? (
              <p>{transcription}</p>
            ) : (
              <p className="text-gray-400 text-sm">No transcription available yet.</p>
            )}
          </div>
          {transcription && (
            <button
              onClick={handleDownload}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Download
            </button>
          )}
        </div>
      </div>
      <Howitworks content={content} />
      <Faq faqs={transcribeFaq} />
      <Footer />
    </>
  );
};

export default Transcribe;
