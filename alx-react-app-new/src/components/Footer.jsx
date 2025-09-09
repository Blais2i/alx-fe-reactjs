import React from 'react';

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#2c3e50', 
      color: 'white', 
      textAlign: 'center',
      padding: '25px',
      marginTop: 'auto',
      borderTop: '4px solid #3498db'
    }}>
      <p style={{ 
        margin: '5px 0',
        fontSize: '16px'
      }}>
        © 2024 My Favorite Cities App
      </p>
      <p style={{ 
        margin: '5px 0',
        fontSize: '14px',
        color: '#bdc3c7'
      }}>
        Created with React and inline CSS styling
      </p>
      <p style={{ 
        margin: '5px 0',
        fontSize: '14px',
        color: '#95a5a6'
      }}>
        All rights reserved
      </p>
    </footer>
  );
}

export default Footer;