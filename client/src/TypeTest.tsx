import {default as React, useEffect, useState, useRef} from "react";
import Container from "react-bootstrap/Container";
import "./css/QuestionMain.css"
import getLexResponse from './lib/lex-bot.js';

var request_content_type = process.env.REACT_APP_REQUEST_CONTENT_TYPE;
var input_stream = process.env.REACT_APP_INITIAL_INPUT;
var initial_call=true;
var seconds = 0;  
let interval = setInterval(()=>{seconds++;}, 1000);  

navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
});

function resetTimer(){
    clearInterval(interval);
    seconds=0;
    interval = setInterval(()=>{seconds++;}, 1000); 
}

 const TypeTest = () => {
    const [text, setText] = useState("");
    const [character, setCharacter] = useState(0);
    const [totalWordPerMin, setTotalWordPerMin] = useState("");
    const [totalWords, setTotalWord] = useState("");
    const [totalTime, setTotalTime] = useState("");
    const [accuracyRate, setAccuracyRate] = useState("");
    //const [question, setQuestion] = useState("");

    //function to make a call to lex-bot.js
    function callLexBot(input_text: any){
        getLexResponse(input_text, request_content_type);
        //console.log(question);
        resetTimer();
        resetComponent();
    }

    //Start the timer
    useEffect(()=>{
        if(initial_call){
            callLexBot(input_stream); 
            initial_call=false;
        }        
    });    

    //Handle event fire on text change on the text area
    const handleTextChange = (event: any) =>{
        //console.log("change");
        setCharacter(character +1);
        setText(event.target.value);
    };

    const resetComponent = ()=>{
        setCharacter(0);
        setText("");
    };

    //Handle event fire on the button click
    const handleButtonClick = () =>{
        setTotalTime("")
        setTotalWord("")   
        setTotalWordPerMin("");
        setAccuracyRate("");

        //Calculation
        let total_character_typed = character;
        let total_character_present = text.length;
        let total_words = text.length>0? text.trim().split(" ").length:0;
        //console.log(total_words);

        let total_word_per_min = total_words > 0 ? ((total_words/seconds)*60).toFixed(1) : 0;
        let accuracy = total_character_present > 0 ? Math.round((total_character_present/total_character_typed)*100) : 0;
        let total_time = seconds>60? Math.floor(seconds/60)+" min(s) and "+Math.trunc(seconds-(seconds/(seconds/60)))+" sec(s)":seconds+" sec(s)";

        setTotalTime("Total time taken is: "+total_time)
        setTotalWord("Total word typed is: "+total_words)   
        setTotalWordPerMin("Total words per min is: "+total_word_per_min);
        setAccuracyRate("Typing accuracy is: "+accuracy+"%");
        
        //Text input sent to lex.
        if(window.confirm("Do you want to continue with you answer.\nClick 'Ok' to continue else 'Cancel' to answer again.")){
            callLexBot(text);
        }else{
            resetComponent();
        }
    };

    return (
        <React.Fragment>
            {/* <div>
                <span>
                    {question}
                </span>
            </div> */}
            <div>
                <span><textarea placeholder="Answer Transcript..." value={text} onChange={handleTextChange}>{text}</textarea></span>
            </div>
            <div>
                <span><button onClick={resetComponent} className="button">Clear</button></span>
                <span><button type="submit" onClick={handleButtonClick} className="button">Submit</button></span>
            </div>
            <div>
                <span>
                    <table>
                        <tbody>
                            <tr>
                                <td>{totalTime}</td>
                            </tr>
                            <tr>
                                <td>{totalWords}</td>
                            </tr>
                            <tr>
                                <td>{totalWordPerMin}</td>
                            </tr>
                            <tr>
                                <td>{accuracyRate}</td>
                            </tr>
                        </tbody>                            
                    </table>
                </span>
            </div>
        </React.Fragment>
    );
 };

 export default TypeTest;