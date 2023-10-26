import React from 'react'
import {decode} from 'html-entities'

export default function Question( {value, index} ) {
    
    
    return (
        <>
       
       <h1>{decode(value)}</h1>
       </>
    )
}