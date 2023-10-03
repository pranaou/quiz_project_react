import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #8e9eab, #eef2f3)',
        margin: 0,
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh', 
    },
    title: {
        fontFamily: "'Pacifico', cursive",
        fontSize: '32px',
        textAlign: 'center',
        color: '#2C3E50',
        marginBottom: '50px',
    },
    studentCard: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '20px 30px',
        boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.2)',
        width: '350px',
        marginBottom: '20px',
    },
    studentInfoH1: {
        fontFamily: "'Roboto Slab', serif",
        fontSize: '26px',
        marginBottom: '15px',
        color: '#2C3E50',
    },
    studentInfoP: {
        fontSize: '16px',
        marginBottom: '10px',
        color: '#7F8C8D',
    }
}



function UserStats() {
    const [stats, setStats] = useState([]);
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 }
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/userstats/')
            .then(response => {
                setStats(response.data);
            })
            .catch(error => {
                console.error("Error fetching user stats!", error);
            });
    }, []);

    return (
        <div style={styles.body}>
            <div style={styles.title}>User Statistics</div>
            {stats.map(stat => (
                <animated.div style={{ ...props, ...styles.studentCard }} key={stat.user}>
                    <div>
                        <h1 style={styles.studentInfoH1}>{stat.user}</h1>
                        <p style={styles.studentInfoP}><strong>Quizzes Attempted:</strong> {stat.attempted}</p>
                        <p style={styles.studentInfoP}><strong>Average Score:</strong> {stat.average_score.toFixed(2)}</p>
                    </div>
                </animated.div>
            ))}
        </div>
    );
}

export default UserStats;