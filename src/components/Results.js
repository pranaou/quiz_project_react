import React from 'react';
import { useLocation } from "react-router-dom";

const styles = {
    body: {
        fontFamily: "'Roboto', sans-serif",
        background: 'linear-gradient(to bottom right, #fff, #002664)', 
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh', 
    },
    header: {
        backgroundColor: '#343a40',
        color: 'white',
        padding: '15px 0',
        width: '100%',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 700,
        letterSpacing: '1px',
        marginBottom: '50px'
    },
    resultsCard: {
        backgroundColor: '#e0e0e0',  
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '500px',
        border: 'none',  
    },
    resultsCardHeader: {
        fontSize: '22px',
        margin: '0 0 20px 0',
        color: '#2C3E50',
        textAlign: 'center'
    },
    resultsCardParagraph: {
        marginBottom: '15px',
        fontSize: '22px',
        textAlign: 'center',
        color: '#002664' 
    }
};

function Results({ score: propScore = 0, total })  {
    const location = useLocation();
    const { score: stateScore, totalQuestion } = location.state || {};
    const finalScore = stateScore !== undefined ? stateScore : propScore;
    const finalTotal = totalQuestion !== undefined ? totalQuestion : total;

    return (
        <div style={styles.body}>
            <header style={styles.header}>Quiz Results</header>
            <div style={styles.resultsCard}>
                <h1 style={styles.resultsCardHeader}>Thank you for attending the quiz!</h1>
                <p style={styles.resultsCardParagraph}>Your score: {finalScore}/{finalTotal}</p>
            </div>
        </div>
    );
}

export default Results;
