import React from 'react';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Container from './component/Container';

function App() {
  return (
    <div className="card">
      <Header />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
