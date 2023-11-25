import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Answer from './Answer'
import Question from './Question'
import { nanoid } from 'nanoid'


function MainQuestions( { questions, getQuestions, setStart }) {
    
const [questionsData, setQuestionsData] = useState(questions)
const [formData, setFormData] = useState({}) // combine with shuffled data or set as initial data
const [isScored, setIsScored] = useState(false)
const [score, setScore] = useState(0)
const [shuffled, setShuffled] = useState([])
const [reset, setReset] = useState(false)


console.log(shuffled)



/** ONMOUNT AND RESET CALLS API FUNCTION AND SHUFFLES DATA */
/** right now resets this maybe it should be questionsData? */
useEffect(() => {
  const shuffledData = questionsData.map((question) => {
    const answersWithCorrectAtRandomPosition = insertAtRandomPosition(
      question.incorrect_answers,
      question.correct_answer
    );
    return { ...question, allAnswers: answersWithCorrectAtRandomPosition };
  });
  setShuffled(shuffledData);
}, [reset]);



/** SHUFFLE DATA FUNCTION USED ABOVE */
function insertAtRandomPosition(array, item) {
  const newArray = [...array];
  const position = Math.floor(Math.random() * (newArray.length + 1));
  newArray.splice(position, 0, item);
  return newArray;
}


/* UPDATES FORMDATA WHICH HOLDS SELECTED ANSWERS*/  
function handleChange(questionId, optionId) { //takes in question index and selected answer value
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [questionId]: optionId
          }
      })
  }

/* CALCULATE SCORE FUNCTION*/  
const calculateScore = () => {
  shuffled.forEach((question, index) => {
    if (formData[index] === question.correct_answer) {
      setScore(prev => prev + 1);
    }
  });
};


/** RUNS CALCULATE SCORE FUCTION ABOVE */
React.useEffect(() => {
  calculateScore();
}, [isScored]);  
  
    
/** FUNCTION FOR SCORE QUIZ BUTTON */
function scoreQuiz() {
  setIsScored(prev => !prev)
 
}   

/** FUNCTION FOR RESET QUIZ BUTTON */
function resetQuiz() {
  setFormData({})
  setIsScored(prev => !prev)
  setReset(prev => !prev)// what is this doing
  setScore(0)
  setStart(false)
}



  
let questionEl = shuffled.map((item, index) => (
  <div className="each-question-container" key={nanoid()}>
    <Question index={index} value={item.question} />
    <div key={nanoid()} className="answers-container">
        {item.allAnswers.map((answer) => (
        <Answer 
            key={nanoid()}
            isCorrect={shuffled[index].correct_answer} 
            checked={formData[index] === answer} 
            name={`item_${index}`} 
            value={`${answer}-${index}`}
            text={answer} 
            onChange={() => handleChange(index, answer)}
            isScored={isScored}
            disabled={isScored}
            />  
    
        ))}
    </div>
    <hr />
  </div>
));
  
  

return (
  <div className="main-questions-container">

    {questionEl}
        <div className="button-container">
        { !isScored && <button onClick={scoreQuiz}>Score</button> }
        { isScored && <button onClick={resetQuiz}>reset quiz</button> }
        { isScored && <span className="your-score">Your Score is {score}/{shuffled.length}</span> }
        </div>
  </div>
);
}

export default MainQuestions