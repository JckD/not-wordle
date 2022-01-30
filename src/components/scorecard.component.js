import React from "react"

export default function Scorecard(props) {

   function closeModal() {
      
      if(document.getElementById('modal')) {
          document.getElementById('modal').classList.toggle('is-active')

      }  
    }

    
    return (
        <div className="modal is-active" id="modal">
            <div className="modal-background" onClick={() => closeModal()}></div>

            <div className="modal-content modal-div">
                <div className="level-right">
                    <button className="modal-close" aria-label="close"  onClick={() => closeModal()}></button>
                </div>

                <h3 className="title is-3 level-item">Game Over</h3>
                <h4 className="title is-4">Word: {props.word}</h4>
                <h4 className="title is-4">Score: {props.score}/6</h4>
                <div className="level-item">
                    <button className="button is-success" onClick={() => props.newGame()}>New Game</button>
                </div>               
                
            </div>
        </div>
    )
}