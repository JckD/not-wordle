import React from "react";

export default function AppHeader (props) {


    function closeModal() {
      
        if(document.getElementById('modal')) {
            document.getElementById('modal').classList.toggle('is-active')
  
        }  
      }

    
    return (
        <>

        <div className="level-item ">
            <h1 className="title is-2 $title-color">NOT WORDLE</h1> 
       
        </div>
         <div className='level-right'>
            <button className='button is-dark' onClick={() => closeModal()}>
                ?
            </button>
        </div> 
        <div className="modal" id="modal">
            <div className="modal-background" onClick={() => closeModal()}></div>
            <div className="modal-content modal-div">
                <div className="level-right">
                    <button className="modal-close" aria-label="close"  onClick={() => closeModal()}></button>
                </div>
                <h3 className="title is-3 level-item">About</h3>
                <p className="has-text-white">
                    Not-Wordle by <a href="https://www.github.com/JckD">JckD</a> in tribute to the original <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>.
                </p>
                <p className="has-text-white">Made using React, Bulma and deployed on Netlify.</p>
                <br/>
                <p className="has-text-white">Definetly don't inspect element and look at the console 👀</p>
            </div>
        </div>
        </>
    )
    
}