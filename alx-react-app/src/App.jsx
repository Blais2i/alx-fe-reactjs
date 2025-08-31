import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      
      {/* UserProfile component with props */}
      <UserProfile 
        name="Alice" 
        age="25" 
        bio="Loves hiking and photography" 
      />
      
      {/* You can add more user profiles */}
      <UserProfile 
        name="Bob" 
        age="30" 
        bio="Passionate about cooking and travel" 
      />
      
      <UserProfile 
        name="Charlie" 
        age="22" 
        bio="Software developer and music enthusiast" 
      />
      
      <Footer />
    </div>
  );
}

export default App;