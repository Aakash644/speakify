
import './App.css';
import Signup from './Components/Signup.js';
import Signin from './Components/Login.js';
import NotFound from './Components/NotFound.js'
import Back2Top from './Components/Back2Top.js';
import NavBar from "./Components/Navigation.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Speech_2_text from "./Components/Speech2text.js";
import Text_2_speech from "./Components/Text2speech.js";
import Transcribe from "./Components/Transcribe.js";
import Text_translate from "./Components/Texttranslate.js";
import Home from "./Components/Home.js";


function App() {
 

  return (
<>
<Router>
      <div>
        {/* Define the routes */}
        <NavBar/>
        {/* <ProgressBar /> */}
        <Routes>
        <Route path="/" element={<Home />} /> {/* Root/Home page */};
          <Route path="/Text_2_speech" element={<Text_2_speech />} /> {/* Root/Home page */}
          <Route path="/Speech_2_text" element={<Speech_2_text />} /> {/* About page */}
          <Route path="/Transcribe" element={<Transcribe />} /> About page
          <Route path="/Text_translate" element={<Text_translate />} /> {/* Contact page */}
          <Route path="/signup" element={< Signup />} /> {/* Contact page */}
          <Route path="/signin" element={< Signin />} /> {/* Contact page */}
          <Route path="*" element={<NotFound />} />
        
        </Routes>
      </div>
    </Router>
<Back2Top/>


    </>
  );
}

export default App;

