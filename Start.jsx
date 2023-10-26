import React, { useState } from 'react'


function Start( { handleClick, handleChange, inputsValue } ) {





  return (
    <div className="start-container">
        <h1>Quizzical</h1>
        
        <div className="start-inputs-container">
          <fieldset>
            <legend>Catagory</legend>
            <select name="catagory" id="catagory-select" onChange={(e) => handleChange(e.target.id, e.target.value)}>
              <option value="">--Please choose a Catagory--</option>
              <option value="9">General Knowledge</option>
              <option value="11">Entertainment-Film</option>
              <option value="12">Entertainment-Music</option>
              <option value="21">Sports</option>
              <option value="22">Geogrophy</option>
              <option value="26">Celebrities</option>
            </select>
          </fieldset>
          
          <fieldset>
            <legend>Difficulty</legend>
            <select name="difficulty" id="difficulty-select" onChange={(e) => handleChange(e.target.id, e.target.value)}>
              <option value="">--Please choose a level--</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </fieldset>
          
          <fieldset>
            <legend>Number of Questions<span>{` - ${inputsValue['num-of-questions']}`}</span></legend>
            <input id="num-of-questions" className="start-inputs" type="range" min="5" max="25" step="5" value={inputsValue['num-of-questions']} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
          </fieldset>
        </div>


        

        
        <button onClick={handleClick}>Start Quiz</button>
    </div>
  )
}

export default Start