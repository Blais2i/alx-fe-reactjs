import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Counter from './components/Counter'; // Import the Counter component
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      
      {/* Add the Counter component */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <h2 style={{ color: '#2980b9' }}>Counter Application</h2>
        <Counter />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;