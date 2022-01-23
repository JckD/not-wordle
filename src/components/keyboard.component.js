import React, { Component } from 'react';


const Key = props => (
    <div className='column'>
        <button className='button is-light'>{props.letter}</button>
    </div>
)

export default class Keyboard extends Component {

    constructor(props) {
        super(props)

        this.generateRows = this.generateRows.bind(this);
        this.generateLetters = this.generateLetters.bind(this);

        this.state = {

        }
    }

    componentDidMount() {

    }

    generateRows() {
        
        const firstLineArr = ['Q','W','E','R','T','Y','U','I','O','P']
        const secondLineArr = ['A','S','D','F','G','H','J','K','L']
        const thirdLineArr = ['Enter','Z','X','C','V','B','N','M', 'DEL']

        let rows = [firstLineArr, secondLineArr, thirdLineArr]

        return rows.map(function(row, i){
            return <div  key={i} className='columns is-variable is-1'> 
                    {row.map(function(letters, j){
                    return <Key key={j} index={j} letter={letters}/>
                    })}
                  </div>
        })


    }

    generateLetters() {
        return <p>hi</p>
    }



    render() {
        return (
            <div>{this.generateRows()}</div>
            
        )
    }
}