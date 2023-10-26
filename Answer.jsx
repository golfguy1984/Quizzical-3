import React, {useState} from 'react';
import {decode} from 'html-entities'

export default function Answer({text, isCorrect, isScored, name, value, onChange, checked, disabled}) {


let backgroundColor = ''
let color = ''


if (isScored && !checked) {
    color = 'lightgray'
    backgroundColor = (text === isCorrect) ? 'green' : ''
}


if (isScored && checked) {
backgroundColor = (text === isCorrect) ? 'green' : '#E94057';
}


    return (
        
        <>
            <input
                id={value}
                type='radio'
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="quiz-inputs"

            />
            <label 
                htmlFor={value}
                style={{ backgroundColor: backgroundColor, color: color}}
            >   
            {decode(text)}
            </label> 
        </>
                
    )
}


