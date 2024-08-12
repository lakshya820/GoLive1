import * as io from "socket.io-client";
import { default as React, useState } from "react";
import Header from "./Header";
import '../css/Grammar.css';

const Grammar: React.FC = () => {
    const [grammarCorrectionResult, setGrammarCorrectionResult] = useState<string[]>([]);


    const socket = io.connect("https://golive1-1.onrender.com");


    socket.on("grammarCorrectionResult", (data) => {
      setGrammarCorrectionResult(data);
      console.log('grammaresult:', data);
    });

    return (
        <React.Fragment>
            <div className="grammar">
              <Header></Header>
            <h5>Grammar Suggestion:</h5>
            {grammarCorrectionResult.map((result, index) => (
              <p key={index}>{result}</p>
            ))}
          </div>
        </React.Fragment>
    );
}

export default Grammar;