import { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import HangupButton from './HangUpButtons'
import socket from '../utilities/socketConnection'
import { useSelector } from 'react-redux';

const ActionButtons = ({openCloseChat})=>{
    const callStatus = useSelector(state=>state.callStatus);
    // const callStatus = useSelector(state=>state.callStatus);
    const menuButtons = useRef(null)
    let timer;


    useEffect(()=>{
        const setTimer = ()=>{
            // console.log(callStatus.current)
            if(callStatus.current !== "idle"){
                timer = setTimeout(()=>{
                    menuButtons.current.classList.add('hidden');
                    // console.log("no movement for 4sec. Hiding")
                }, 4000);    
            }
        }

        window.addEventListener('mousemove', ()=>{
            //mouse moved! 
            //it's hidden. Remove class to display and start the timer
            if (menuButtons.current && menuButtons.current.classList && menuButtons.current.classList.contains('hidden')) {
                // console.log("Not showing. Show now")
                menuButtons.current.classList.remove('hidden');
                setTimer();
            }else{
                // Not hidden, just reset start timer
                clearTimeout(timer); //clear out the old timer
                setTimer();
            }
        });
    },[])

    let micText;
    if(callStatus.current === "idle"){
        micText = "Join Audio"
    }else if(callStatus.audio){
        micText = "Mute"
    }else{
        micText = "Unmute"
    }

    return(
        <div id="menu-buttons" ref={menuButtons} className="row">
            {/* <i className="fa fa-microphone" style="font-size:48px;color:red"></i> */}
            <div className="left col-2">
                <div className="button mic d-inline-block">
                    <i className="fa fa-microphone"></i>
                    <div className="btn-text">{micText}</div>
                </div>
                <div className="button camera d-inline-block">
                    <i className="fa fa-video"></i>
                    <div className="btn-text">{callStatus.video ? "Stop" : "Start"} Video</div>
                </div>
            </div>

            <div className="col-8 text-center">
                <div className="button security d-inline-block">
                    <i className="fa fa-users"></i>
                    <div className="btn-text">Participants</div>
                </div>
                <div className="button participants d-inline-block">
                    <i className="fa fa-comment" onClick={openCloseChat}></i>
                    <div className="btn-text" onClick={openCloseChat}>Chat</div>
                </div>
                <div className="button participants d-inline-block">
                    <i className="fa fa-desktop"></i>
                    <div className="btn-text">Share Screen</div>
                </div>
            </div>  

            <div className="center justify-center text-end col-2">
                <HangupButton/>
            </div>
        </div> 
    )
}

export default ActionButtons;