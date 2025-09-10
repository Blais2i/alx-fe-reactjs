function About() {
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      marginTop: '20px'
    }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px' }}>About Us</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#34495e' }}>
        Our company has been providing top-notch services since 1990. We specialize in various 
        fields including technology, marketing, and consultancy. Our team of experienced 
        professionals is committed to delivering innovative solutions that drive business growth.
      </p>
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#2980b9' }}>Our Mission</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#34495e' }}>
          To empower businesses with cutting-edge solutions and strategic guidance that 
          transform challenges into opportunities for growth and success.
        </p>
      </div>
    </div>
  );
}

export default About;