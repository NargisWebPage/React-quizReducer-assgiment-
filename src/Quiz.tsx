//import react hooks and the quiz reducer */}
import { useReducer, useState} from "react";
import { quizReducer,initialState,TOTAL_QUESTIONS, }from "./quizReducer";
import "./App.css";

// stores the quiz questions options and correct answer inside an []
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
    },

    {
        question: "What is CSS used for?",
        options: [
            "Adding structure to a webpage",
             "Styling a webpage",
             "Managing a database",
        ],
        correctAnswer: "Styling a webpage",
    },
    
    {
        question: "Which language is used to make webpages interactive?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
        ],
        correctAnswer: "JavaScript",
    },

    {
        question: "What is TypeScript?",
        options: [
            "A database",
            "A typed version of JavaScript",
            "A CSS framework",
        ],
        correctAnswer: "A typed version of JavaScript",
    },

    {
        question: "What is React mainly used for?",
        options: [
            "Building user interfaces",
            "Managing databases",
            "Styling documents",
        ],
        correctAnswer: "Building user interfaces",
    },

];

// main component of the learning quiz
function Quiz(){
  // manages the quiz state using useReducer
  const[state, dispatch] = useReducer(
     quizReducer, 
     initialState
  );

 // check whether the user has answered the current question or not
  const[hasAnswered, setHasAnswered] = useState(false);
 
  // gets te current question from the questions array
  const currentQuestion = questions[state.currentQuestion];

  // display the final score when the quiz is finished
     if(state.finished){
        return(
            <div className="quiz-container">
                <h1>Quiz Completed!</h1>
                 <h2>Your Score: {state.score} / {TOTAL_QUESTIONS}</h2>
                 
                 {/* restarts the quiz from the beginning */}
                 <button 
                    onClick={() => {
                         dispatch({type: "RESTART"});
                         setHasAnswered(false);
                    }}>
                        Restart Quiz
                 </button>
            </div>
        );
     }

  return(
    <div className="quiz-container"> 
        <h1>Learning Quiz</h1>

        {/* display the current question*/}
        <h2>{currentQuestion.question}</h2>

        {/* display the answer options in buttons */}
        {currentQuestion.options.map((option, index) => (
            <button key={index}
                disabled={hasAnswered}
                 onClick={() => {

                    {/* checks the answer and send it to the reducer*/}
                    dispatch({
                        type: "ANSWER",
                        correct: option === currentQuestion.correctAnswer,
                    });
                    setHasAnswered(true);
            }} 
            >
                {option}
            </button>

        ))}

        {/* next question button after an answer is selected*/}
        {hasAnswered && (
            <button 
               onClick={() => {
                  dispatch({type: "NEXT_QUESTION"});
                  setHasAnswered(false);
               }}  >

                Next Question
            </button>
        )}
    </div>
  );
}

export default Quiz;