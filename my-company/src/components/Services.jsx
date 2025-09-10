function Services() {
  const services = [
    {
      title: "Technology Consulting",
      description: "Expert advice on technology strategy, implementation, and optimization."
    },
    {
      title: "Market Analysis",
      description: "Comprehensive market research and competitive analysis to guide your business decisions."
    },
    {
      title: "Product Development",
      description: "End-to-end product development services from concept to deployment."
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns to boost your online presence."
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services."
    },
    {
      title: "Data Analytics",
      description: "Advanced data analysis and visualization to drive informed decisions."
    }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#ecf0f1' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '40px' }}>Our Services</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {services.map((service, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2980b9', marginBottom: '15px' }}>{service.title}</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.5' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;