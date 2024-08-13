import { default as React, useState } from "react";

import MainLayout from "./MainLayout";
import '../css/Tests1.css';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import ExamLayout from "./ExamLayout";
import VoiceTest from "../VoiceTest";


const Tests1: React.FC = () => {
  const [showExamLayout, setShowExamLayout] = useState(false);

    const navigate = useNavigate();

    const handleNavigateToTests2 = () => {
        navigate('/exam/voicetest');
      };

      // const handleButtonClick = () => {
      //   setShowExamLayout(true);
      // };

  return (
    <div className="tests1">
      <Header></Header>
                <div className="tests1_header">
                    <h1>Tests</h1>
                </div>
                <div className="tests1_card">
                    <div className="card_header">
                    <p>Grammar Test</p>
                    </div>
                    <div className="card_label1">
                            <p>The grammar test will assess participants' spoken and written responses for accuracy in tense use, subject-verb agreement, sentence structure, punctuation, and coherence. The focus is on evaluating their ability to construct clear and grammatically correct sentences in real-time.</p>
                    </div>
                    <div className="card_label2">
                            <p> Duration: 20 mins</p>
                    </div>
                    <div className="card_buttons">
                            
                            <button className="card_button_start" onClick={handleNavigateToTests2}>Start Test</button>
                            <button className="card_button_cancel">Cancel</button>
                    </div>
                </div>
    </div>
  )
}

export default Tests1;