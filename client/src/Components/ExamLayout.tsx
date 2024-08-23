// Header.tsx
import React from 'react';
import '../css/Header.css';
import '../css/NavBar.css';
import '../css/QuestionMain.css'
import Timer from "../lib/test-timer";
import Container from "react-bootstrap/Container";
import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

// interface MainLayoutProps{
//   children: React.ReactNode; // To render other components inside MainLayout
// }

const ExamLayout: React.FC = () => {
  let disable_timer=false;
  let disable_visiblity = false;

  function stop_exam(status:any){
    document.getElementById('pnl-rev')?.remove();
    if(status=="timer"){
      disable_visiblity=true;
      document.getElementById('exam-pnl')!.innerHTML = `<div style='background-color: #F4F5F8; height: 70vh; border-radius: 5px; text-align: center; padding-top: 15px; width: 100vw;'>
                                                          <div style='text-align: inherit; font-weight: 600; font-size: 24px; padding-top: 100px;'>
                                                            <span>Your time is up.</span>
                                                          </div>
                                                          <div style='padding-top:inherit;'>
                                                            <span>Your score is `+show_score()+`</span>
                                                          </div>
                                                          <div style='padding-top:inherit;'>
                                                            <span><button onClick="(function(){document.exitFullscreen();})();return false;" style='width: 10rem; border-radius: 7px; height: 2.2rem; border: none; background-color: #5F249F; color: #ffff; margin-right:5px;'>close</button></span>
                                                          </div>
                                                        </div>`;

    }else{
      disable_timer=true;
      document.getElementById('exam-pnl')!.innerHTML =  `<div style='background-color: #F4F5F8; height: 70vh; border-radius: 15px; text-align: center; padding-top: 15px; width: 100vw; '>
                                                          <div style='text-align: inherit; font-weight: 600; font-size: 24px; padding-top: 100px;'>
                                                            <span>You have exited from the full screen. The exam is submited.</span>
                                                          </div>
                                                          <div style='padding-top:inherit;'>
                                                            <span>Your score is `+show_score()+`</span>
                                                          </div>
                                                          <div style='padding-top:inherit;'>
                                                            <span><button onClick="(function(){document.exitFullscreen();})();return false;" style='width: 10rem; border-radius: 7px; height: 2.2rem; border: none; background-color: #5F249F; color: #ffff; margin-right:5px;'>close</button></span>
                                                          </div>
                                                        </div>`;
    }
    

  }

  const handleOnTimerStops = () => {
    if(!disable_timer){      
      //stop_exam("timer");
    }
  };

  // window.onload=()=>{
  //   document.getElementById('overlay')!.style.display="block";
  // }

  // document.onvisibilitychange=()=>{
  //   console.log('visiblity state: ', document.visibilityState);
  //   if(!disable_visiblity){
  //     if (document.visibilityState === 'hidden'){
  //       stop_exam("intruption");
  //     }
  //   }
  // };

  // document.addEventListener('fullscreenchange', () => {
  //   if(!disable_visiblity){
  //     if (!document.fullscreenElement) {
  //       stop_exam("intruption");
  //     }
  //   }
  // });

  const handlefullscreen=()=>{
    // document.documentElement.requestFullscreen();
    // document.getElementById('overlay')!.style.display="none";
  }

  function show_score(){
    return "80%";
  }

  return (
    <Container className='exam_layout'>
      <Row className="header">
        <Col >
          <div className='overlay' id='overlay'>
            <div className='overlay-content'>
              <div className='overlay-elem'><span>For the exam you have to go to a full screen mode. In between exam if you exit from full screen mode then the exam will be terminated. Click on the ok to start the exam.</span></div>
              <div className='overlay-elem'><button className='button' onClick={handlefullscreen}>Ok</button></div>
            </div>            
          </div>
          <div>
            <div className="logo">VOICE TRAINING</div>
            <div className="user-info">
              {/* <img src={Logo} alt="Decorative background" className="header-right-image" /> */}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='exam-pnl' id="exam-pnl">
            <div id='pnl-rev'>
              <div className='exam-timer'><span id='timer'><Timer onTimerStops={handleOnTimerStops}/></span></div>
              <div className='ques-pnl'>
                <div className='info-header'>
                  <span>Grammar Test</span>
                </div>
                <div className='info-content'>
                  <span>Note: Please take 30-40 seconds to think about your answer and then try answering confidently.</span>
                </div>
                <div className='ques-no'>        
                  <span id='ques_no'>Question</span>
                </div>
                <span hidden><audio id="audio" controls></audio></span>
                <div className='ques-disp'><span id="ques-disp">Loading question...</span></div>
              </div>
              <div className='ans-pnl'>            
                <Outlet/>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ExamLayout