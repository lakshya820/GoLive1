import * as io from "socket.io-client";
import { default as React, useState } from "react";
import Header from "./Header";
import '../css/Grammar.css';

interface GrammarCorrectionResult {
  correct: string[];
  incorrect: string[];
  total: number;
}

const Grammar: React.FC = () => {
  const [grammarCorrectionResult, setGrammarCorrectionResult] = useState<GrammarCorrectionResult | null>(null);

    const socket = io.connect("http://localhost:8081");

  
    socket.on("grammarCorrectionResult", (data: GrammarCorrectionResult) => {
      setGrammarCorrectionResult(data);
      console.log('grammaresult:', data);
    });

    return (
        <React.Fragment>
            <div className="grammar">
              <Header></Header>
              {grammarCorrectionResult && (
                <div className="grammar_content">
                  <table className="grammar_table">
                    <thead>
                      <tr>
                        <th>Original Statements</th>
                        <th>Corrected Statements</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grammarCorrectionResult.correct.map((correctStatement, index) => (
                        <tr key={index}>
                          <td>{grammarCorrectionResult.incorrect[index]}</td>
                          <td>{correctStatement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p>Total Correct Percentage: {grammarCorrectionResult.total.toFixed(2)}%</p>
                </div>
              )}
          </div>
        </React.Fragment>
    );
}

export default Grammar;