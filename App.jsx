import React, { useState } from 'react'
import Start from './Start'
import MainQuestions from './MainQuestions'

function App() {

const [start, setStart] = useState(false) // determines which page to display and is changed by the button on the start page
const [questions, setQuestions] = useState([]) // state to hold the questions returned from the API
const [inputsValue, setInputsValue] = useState( 
                  {
                "catagory-select": "",
                "difficulty-select": "",
                "num-of-questions": 15
                })

// this function is called when the button is clicked and calls the get questions function
// async function handleClick() {
//   await getQuestions()
// }

// fetches the questions - sets questions state and displays the quiz page
async function getQuestions() {
  let res = await fetch(`https://opentdb.com/api.php?amount=${inputsValue['num-of-questions']}&category=${inputsValue['catagory-select']}&difficulty=${inputsValue['difficulty-select']}&type=multiple`)
  let data = await res.json()
    setQuestions(data.results)
    setStart(true)
    
}

function handleChange(id, value) { //takes in question index and selected answer value
      setInputsValue(prev => {
          return {
              ...prev,
              [id]: value
          }
      })
  }




  return (
    <div className={start ? "main-container-questions" : "main-container"}>
      {!start && <Start 
                      handleClick={getQuestions}
                      handleChange={handleChange}
                      inputsValue={inputsValue}
                      />}
      {start && 
                <>
                  <MainQuestions 
                      questions={questions}
                      getQuestions={getQuestions}
                      setStart={setStart} 
                      />
                </>
                    }
    </div>
  )
}

export default App