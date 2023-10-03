import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const mockUsers = [
    { username: 'John', password: 'pass1', stats: { quizzesCompleted: 0, totalScore: 0 } },
    { username: 'Jack', password: 'pass2', stats: { quizzesCompleted: 0, totalScore: 0 } },
    { username: 'Joe', password: 'pass3', stats: { quizzesCompleted: 0, totalScore: 0 } }

];



const styles = {
    body: {
        fontFamily: "'Roboto', sans-serif",
        padding: '2rem',
        background: 'linear-gradient(to bottom right, #fff, #002664)',
    },
     h1: {
        color: '#2C3E50', 
        marginBottom: '2rem',
        fontSize: '2.5rem',
        textAlign: 'center',
        textShadow: '2px 2px 2px rgba(255, 255, 255, 0.7)', 
    },
    mcqContainer: {
        backgroundColor: '#e0e0e0',  
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '700px',
        margin: '1rem auto',
        border: 'none',  
    },
    question: {
        fontSize: '1.8rem',
        marginBottom: '1rem',
        textAlign: 'left',
        color: '#000',
    },
    options: {
        listStyleType: 'none',
        padding: 0,
        textAlign: 'left',
    },
    optionItem: {
        padding: '0.5rem 0',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#dcedc1',
            borderRadius: '8px',
        },
    },
    optionLabel: {
        cursor: 'pointer',
        fontSize: '1.4rem',
        color: '#000',
    },
    optionInput: {
        marginRight: '1rem',
        transform: 'scale(1.3)',
    },
    button: {
        backgroundColor: '#002366',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '18px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
        display: 'block',
        margin: '2rem auto',
        width: 'fit-content',
        fontFamily: "'Bangers', cursive",
        '&:hover': {
            backgroundColor: '#ff3366',
            transform: 'scale(1.1)',
        },
    },


 loginBackground: {
        backgroundColor: '#002644', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    inputBox: {
        width: '100%',
        padding: '10px',
        marginTop: '10px',
        marginBottom: '20px',
        border: '2px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s',
        '&:focus': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            borderColor: '#3498db',
        },
    },
    loginButton: {
        width: '100%',
        padding: '12px 15px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#2980b9',
        },
    },

     loginContainer: {
        maxWidth: '400px',
        backgroundColor: 'white',
        padding: '40px 30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    loginHeader: {
        textAlign: 'center',
        marginBottom: '25px',
        color: '#2C3E50',
    },
    loginInput: {
        width: '100%',
        padding: '12px 15px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
    },

};

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [feedback, setFeedback] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/questions/')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the questions!", error);
            });
    }, []);

    const handleLogin = () => {
        const user = mockUsers.find(u => u.username === username && u.password === password);
        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
        } else {
            alert('Invalid credentials.');
        }
    };

    const handleAnswerChange = (e, questionId, questionType) => {
        const { checked, value } = e.target;

        setSelectedAnswers(prevState => {
            if (questionType === 'single') {
                return { ...prevState, [questionId]: value };
            } else {
                let prevSelected = prevState[questionId] || [];
                if (checked) {
                    return { ...prevState, [questionId]: [...prevSelected, value] };
                } else {
                    return { ...prevState, [questionId]: prevSelected.filter(item => item !== value) };
                }
            }
        });
    };

    const handleSubmitQuiz = () => {
        const payload = {
            user: currentUser.username,
            answers: selectedAnswers
        };

        axios.post('http://127.0.0.1:8000/api/quizresults/', payload)
        .then(response => {
            const { score, total_question } = response.data;

	    navigate("/results", { state: { score, totalQuestion: total_question } });
            console.log("Results saved successfully");
        })
        .catch(error => {
            console.error("There was an error saving the results!", error);
        });
    };

if (!isLoggedIn) {
    return (
        <div style={styles.loginBackground}>
            <div style={styles.loginContainer}>
                <h2 style={styles.loginHeader}>Login</h2>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    style={styles.loginInput} 
                    placeholder="Username" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    style={styles.loginInput} 
                    placeholder="Password" 
                    required 
                />
                <button onClick={handleLogin} style={styles.loginButton}>Login</button>
            </div>
        </div>
    );
}



return (
        <div style={styles.body}>
            <h1 style={styles.h1}>Welcome, {currentUser.username}!</h1>
            {questions.map(question => (
                <div key={question.id} style={styles.mcqContainer}>
                    <div style={styles.question}>{question.text}</div>
                    <ul style={styles.options}>
                        {[question.choice_a, question.choice_b, question.choice_c].map(choice => (
                            <li key={choice} style={styles.optionItem}>
                                <label style={styles.optionLabel}>
                                    <input 
                                        style={styles.optionInput}
                                        type={question.type === 'single' ? "radio" : "checkbox"} 
                                        name={`question-${question.id}`}
                                        value={choice}
                                        checked={question.type === 'single' ? selectedAnswers[question.id] === choice : selectedAnswers[question.id]?.includes(choice)}
                                        onChange={(e) => handleAnswerChange(e, question.id, question.type)}
                                    />
                                    {choice}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button style={styles.button} onClick={handleSubmitQuiz}>Submit</button>
            <div>{feedback}</div>
        </div>
    );
}

export default Quiz;