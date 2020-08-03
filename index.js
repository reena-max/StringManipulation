import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import _concat from "lodash/concat";
import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.reversewords=this.reversewords.bind(this)  
     this.state = {
      string: '',
      skip: '',
  
   
    };
  }
reversewords = (string) => {
        const splitwords= _filter(string.split("."), val => !_isEmpty(val));
        const newstring = [];
        splitwords.forEach(sentence => {
            const words = sentence.split(" ");
            if (words.length <= 3) {
                let newsentence  = "";
                words.forEach((wording, skip) => {
                    if (skip ===0) {
                        newsentence  = wording;
                    } else {
                        newsentence  = `${newsentence } ${wording}`;
                    }
                });
                newstring.push(newsentence );

            } else {
                const lastTwoWord = [];
                const otherWords = [];
                words.forEach((word, skip) => {
                    if ((skip === (words.length - 1)) || (skip === (words.length - 2))) {
                        lastTwoWord.push(word);
                    } else {
                        otherWords.push(word);
                    }
                    console.groupEnd();
                });
                const reversingorder = otherWords.reverse();
                const joinarray = _concat(reversingorder, lastTwoWord);
                let newsentence  = "";
                joinarray.forEach((wording, skip) => {
                    if (skip === 0) {
                        newsentence  = wording;
                    } else {
                        newsentence  = `${newsentence } ${wording}`;
                    }
                });
                newstring.push(newsentence );
            }
        });
        let result = "";
        newstring.forEach((string, skip) => {
            if (skip ===0 ) {
                result = string;
            } else if (skip === (newstring.length - 1)) {
                result = `${result}.${string}.`;
            } else {
                result = `${result}.${string}`;
            }
        });
      return result;
    }



   


  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    const {string} = this.state
    const result = this.reversewords(string);
       

        
    return (
         <form>
 
            <div style={{ marginTop: 10 }}>
                  
              
              
                <div className="form-group">
                  <label>Enter Your String: </label>
                   <input  
                              type='text'
                            name='string'
                           value={this.state.string}
                              onChange={this.myChangeHandler}
                      />
                </div>
                  <div className="form-group">
                <label>Enter number you want to skip: </label>
                   <input type="number"  min={0} max={5} 
                     name="skip"
                      value={this.state.skip}
                      onChange={this.myChangeHandler}
                      />
                </div> <br/>



                 <div>
             
                <button onClick={this.reversewords}>Generate Output</button>
            </div>
             
     

               
              <br/>
                <br/>
                 <h4>{string}</h4>
               <br/>

                <h5>{result}</h5> 
                
  </div>   </form>



 );
}
}
  




 


ReactDOM.render(<MyForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
