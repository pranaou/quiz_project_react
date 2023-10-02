import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserStats from './components/UserStats';
import Quiz from './components/Quiz';
import Results from './components/Results'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/user-stats" element={<UserStats />} />
                <Route path="/results" element={<Results />} /> {}
                <Route path="/" element={<Quiz />} />
            </Routes>
        </Router>
    );
}

export default App;
