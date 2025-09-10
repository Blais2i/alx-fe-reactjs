function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#34495e', 
      color: 'white', 
      textAlign: 'center',
      padding: '2rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: '0 0 1rem 0' }}>© 2024 Company Name. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Careers</span>
        </div>
        <p style={{ margin: '1rem 0 0 0', color: '#bdc3c7' }}>
          Transforming businesses through innovation and excellence.
        </p>
      </div>
    </footer>
  );
}

export default Footer;