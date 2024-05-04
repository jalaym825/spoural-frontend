import React, { useContext } from 'react'
import { AppContext } from '../../App';

const OverBalls = () => {
    const appContext = useContext(AppContext);
    return (
        <>
            <div className='w-[94%] gap-x-4 flex flex-row h-[12vh] mt-10 ml-5 mr-5 items-center justify-center rounded-md p-2'>
                {
                    appContext.currentOver.balls.map((ball, i) => {
                        if (ball.wicket)
                            return (<h1 key={i} className='w-12 rounded-full flex justify-center items-center h-12 bg-red-400'>OUT</h1>);
                        else if (ball.ballType === "WIDE")
                            return (<h1 key={i} className='w-12 rounded-full flex justify-center items-center h-12 bg-white'>WD{ball.runs}</h1>)
                        else if (ball.ballType === "NO_BALL")
                            return (<h1 key={i} className='w-12 rounded-full flex justify-center items-center h-12 bg-white'>NB{ball.runs}</h1>)
                        else if (ball.ballType === "LEG_BYE")
                            return (<h1 key={i} className='w-12 rounded-full flex justify-center items-center h-12 bg-white'>LB{ball.runs}</h1>)
                        else if (ball.ballType === "BYE")
                            return (<h1 key={i} className='w-12 rounded-full flex justify-center items-center h-12 bg-white'>BYE{ball.runs}</h1>)
                        else if (ball.runs === 6)
                            return (<h1 key={i} className='w-12 rounded-full flex justify-center items-center h-12 bg-green-400'>6</h1>)
                        else if (ball.runs === 4)
                            return (<h1 key={i} className='w-12 rounded-full flex justify-center items-center h-12  bg-blue-400'>4</h1>)
                        else
                            return (<h1 key={i} className='w-12 rounded-full flex justify-center items-center h-12 bg-white'>{ball.runs}</h1>)
                    })
                }
            </div>
        </>
    )
}

export default OverBalls