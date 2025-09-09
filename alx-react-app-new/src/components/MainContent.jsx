import React from 'react';
import UserProfile from './UserProfile';

function MainContent() {
  return (
    <main style={{ 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '400px'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>User Profiles</h2>
      
      <UserProfile 
        name="John Doe" 
        age={28} 
        bio="I love to visit New York, Paris, and Tokyo." 
      />
      
      <UserProfile 
        name="Jane Smith" 
        age={32} 
        bio="Passionate about architecture and urban planning. Enjoys visiting historical cities like Rome and Athens." 
      />
      
      <UserProfile 
        name="Mike Johnson" 
        age={25} 
        bio="Adventure seeker who loves coastal cities. Big fan of Barcelona and Sydney." 
      />
    </main>
  );
}

export default MainContent;