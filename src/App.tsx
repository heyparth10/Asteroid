import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from "./components/Form";
import Details from "./components/Details";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    );
  }
}

export default App;