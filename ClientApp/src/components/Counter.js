import React, { Component } from 'react';
import { useTest } from '../redux/hooks/useTest';
import { blue, red } from '@mui/material/colors';

function RenderThing(){
   
  const {test} = useTest();
  var val = test.some(val => val.id === 3)

   return(<div style={{width: 100, height: 100, backgroundColor: val? "#0FFFF0" : "#FF0000"}}>

   </div>);
}


export class Counter extends Component {
  static displayName = Counter.name;


  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        {<RenderThing />}
        
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>

        
      </div>

    );
  }
}
