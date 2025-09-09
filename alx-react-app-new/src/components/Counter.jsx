import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '20px',
      margin: '20px auto',
      maxWidth: '300px',
      border: '2px solid #3498db',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa'
    }}>
      <p style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: '#2c3e50'
      }}>
        Current Count: {count}
      </p>
      <div style={{ marginTop: '15px' }}>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            padding: '10px 15px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '10px 15px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{
            backgroundColor: '#7f8c8d',
            color: 'white',
            padding: '10px 15px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;