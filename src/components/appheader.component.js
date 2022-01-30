import React, { Component } from "react";

export default class AppHeader extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
            <div className="level-item ">
                <h1 className="title is-2 $title-color">NOT WORDLE</h1> 
            </div>
            <div className='level-right'>
                <button className='button is-dark'>
                    ?
                </button>
            </div>
         </>
        )
    }
}