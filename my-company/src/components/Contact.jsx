import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your message, ${formData.name}! We will get back to you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '10px',
      marginTop: '20px',
      marginBottom: '20px'
    }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '30px' }}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ 
            padding: '12px', 
            margin: '10px 0', 
            border: '2px solid #bdc3c7', 
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ 
            padding: '12px', 
            margin: '10px 0', 
            border: '2px solid #bdc3c7', 
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{ 
            padding: '12px', 
            margin: '10px 0', 
            border: '2px solid #bdc3c7', 
            borderRadius: '5px',
            fontSize: '16px',
            resize: 'vertical'
          }}
        />
        <button 
          type="submit"
          style={{ 
            backgroundColor: '#27ae60', 
            color: 'white', 
            padding: '15px', 
            border: 'none', 
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;