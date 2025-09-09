import React from 'react';
import UserProfile from './UserProfile';

function MainContent() {
  return (
    <main style={{ 
      padding: '30px',
      backgroundColor: '#ecf0f1',
      minHeight: '400px',
      flex: '1'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#2980b9',
          marginBottom: '25px',
          fontSize: '2rem'
        }}>
          User Profiles
        </h2>
        
        <UserProfile 
          name="John Doe" 
          age={28} 
          bio="Loves traveling and exploring new cultures. Favorite cities include Paris and Tokyo." 
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
      </div>
    </main>
  );
}

export default MainContent;