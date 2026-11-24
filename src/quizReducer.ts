
// defines the shape of quiz state
export type QuizState = {
    currentQuestion: number;
    score: number;
    finished: boolean;
}

// defines all possible acctions in the quiz
export type QuizAction = 
| {type: "ANSWER"; correct: boolean }
| {type: "NEXT_QUESTION" }
| {type: "RESTART" };

// sets the initial valuse of the quiz
export const initialState: QuizState = {
    currentQuestion: 0,
    score: 0,
    finished: false,
};

// stores the total number of questions
export const TOTAL_QUESTIONS = 5;

//reducer function that handles all quiz stat updates
export function quizReducer(
    state: QuizState,
    action: QuizAction
): QuizState{

    // updates the score when the answer is correct
    switch(action.type){
        case "ANSWER":
            return{
                ...state,
                score: action.correct ? state.score + 1 : state.score,
            };
         
        // moves to the next questions or finishe the quiz
        case "NEXT_QUESTION":
            if(state.currentQuestion === TOTAL_QUESTIONS -1){
                return{
                    ...state,
                    finished: true,
                };
            }
            return{
                ...state,
                currentQuestion: state.currentQuestion + 1,
            }
        // resets the quix to its initial state
        case "RESTART":
            return initialState;
        
        // checkes that ll possible actions are handled
        default: {
            const _exhaustive: never = action;
            return _exhaustive;
        }
    }
}