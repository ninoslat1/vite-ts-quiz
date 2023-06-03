import React from 'react'
import {AnswerObj} from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObj | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const Trivia:React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => (
    <div className='font-qs w-full'>
        <p>Question: {questionNumber} / {totalQuestions}</p>
        <p dangerouslySetInnerHTML={{__html: question}}/>
        <div className='py-5'>
            {answers?.map((answer) => (
                <div key={answer} className='p-2'>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback} className='font-rb btn btn-outline btn-info btn-sm'>
                        <span dangerouslySetInnerHTML={{__html: answer}}/>
                    </button>
                </div>
            ))}
        </div>
    </div>
)

export default Trivia
