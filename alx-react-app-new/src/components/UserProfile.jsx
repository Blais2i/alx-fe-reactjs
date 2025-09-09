import React from 'react';

function UserProfile(props) {
  return (
    <div style={{ 
      border: '2px solid #e0e0e0', 
      padding: '20px', 
      margin: '15px 0',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2c3e50', 
        marginBottom: '15px',
        borderBottom: '2px solid #3498db',
        paddingBottom: '8px'
      }}>
        {props.name}
      </h2>
      <p style={{ 
        fontSize: '16px', 
        margin: '8px 0',
        color: '#34495e'
      }}>
        Age: <span style={{ 
          fontWeight: 'bold', 
          color: '#e74c3c',
          fontSize: '18px'
        }}>{props.age}</span>
      </p>
      <p style={{ 
        fontSize: '16px', 
        margin: '8px 0',
        color: '#7f8c8d',
        fontStyle: 'italic',
        lineHeight: '1.5'
      }}>
        Bio: {props.bio}
      </p>
    </div>
  );
}

export default UserProfile;