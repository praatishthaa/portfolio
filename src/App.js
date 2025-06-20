import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
// (About & Activities removed — unless you’re still using them somewhere)

function App() {
  return (
    <div className="App bg-[#0f0f1a] text-white">
      <Navbar />
      <Home />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
