import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trivia from './components/Trivia'
import { fetchTriviaQuestions, Difficulty, QuestionState } from './API';
import { reloadPage } from './util';


const questNum:any = window.prompt("Input the number of total question")

const TOTAL_QUESTION = parseInt(questNum)

const containsNumbers = (str:any) => {
  return /^\d+$/.test(str);
}

if(questNum == null || questNum == '' || containsNumbers(questNum) === false){
  window.alert('Input number only')
  reloadPage();
}

const min_score = Math.floor((TOTAL_QUESTION/2)+(TOTAL_QUESTION/4))

export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswer, setUserAnswer] = useState<AnswerObj[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchTriviaQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );

    setQuestion(newQuestion)
    setScore(0)
    setUserAnswer([])
    setNumber(0)
    setLoading(false)
  }

  const checkTrivia = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value
      const correct = question[number].correct_answer === answer
      if(correct) {
        setScore(prev => prev+1)
      }

      const answerObj = {
        question: question[number].question,
        answer,
        correct,
        correctAnswer: question[number].correct_answer
      }

      setUserAnswer((prev) => [...prev, answerObj])
    }
  }

  const nextTrivia = () => {
    const nextTrivia = number + 1;
    return nextTrivia === TOTAL_QUESTION ? setGameOver(true) : setNumber(nextTrivia)
  }

  if(userAnswer.length === TOTAL_QUESTION && score <= min_score){
    toast.error(`Your score is lower than minimal score (${score}/${min_score})`, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })

  }

  if(userAnswer.length === TOTAL_QUESTION && score >= min_score){
    toast.success(`Your score passed the minimal score (${score}/${min_score})`, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })
    
    
  }

  return (
    <div className='w-[75vw] md:w-[55vw] lg:w-[50vw] mx-auto px-5 h-[75vh] md:h-[65vh] text-center bg-white rounded-md shadow-lg overflow-hidden'>
      <h1 className="text-blue-800 bg-white font-qs text-3xl py-5 text-center font-bold">Trivia Quiz</h1>
      <>
        {gameOver && userAnswer.length === 0 ? (
          <button className='btn btn-sm btn-outline btn-primary font-rb' onClick={startTrivia}>Start</button>
        ) : null }
      </>
      <>
        {userAnswer.length === TOTAL_QUESTION ? (
          <button className='btn btn-sm btn-outline btn-primary font-rb' onClick={reloadPage}>Reload</button>
        ) : null }
      </>
      <div className='bg-white'>
        {!gameOver ? <p className='text-left p-2.5 font-qs'>Score: {score}</p> : null}
        {loading && <button className="btn btn-disabled loading text-sky-600 bg-transparent">Loading</button>}
        {!loading && !gameOver && (
          <>
            <Trivia 
                questionNumber={number+1} 
                totalQuestions={TOTAL_QUESTION} 
                question={question[number].question} 
                answers={question[number].answers}
                userAnswer={userAnswer ? userAnswer[number] : undefined}
                callback={checkTrivia}
            />
          </>
          )
        }
        {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTION || number === TOTAL_QUESTION ? (
          <p>The answer is {question[number].correct_answer
            .replace('&#039;','`')
            .replace('&iacute;','i')}</p>
        ): null}

        {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
          <>
            <button className='btn btn-sm btn-outline btn-primary font-rb my-5' onClick={nextTrivia}>Next Trivia</button>
          </>
        ) : null }
        <>
          {userAnswer.length === TOTAL_QUESTION && score <= min_score ?
            <ToastContainer
            position="bottom-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
          /> : null}
          {userAnswer.length === TOTAL_QUESTION && score >= min_score ?
            <ToastContainer
            position="bottom-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
          /> : null}
        </>
      </div>
    </div>
  )
}

export default App
