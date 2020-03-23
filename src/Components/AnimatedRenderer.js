// import React, { useState, useEffect } from 'react';
//
// export default function AnimatedContainer(dataInput) {
//   const [data, setData] = useState(dataInput);
//   var myReq;
//
//   const tick = () => {
//     setData(dataInput);
//     myReq = window.requestAnimationFrame(tick);
//     console.log(data);
//   }
//
//   window.requestAnimationFrame(tick);
//
//   return data;
// }
//

// above  was the attempt to use hooks





import React from 'react';
export default class AnimatedRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data //data MUST be mutable. That is, it cannot be pass by value, must be pass by reference of some sort
    };
  }

  myReq;
  componentDidMount() {
    window.requestAnimationFrame(this.tick);
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.myReq);
  }
  tick = () => {
    this.setState({
      data: this.props.data,
    });
    this.myReq = window.requestAnimationFrame(this.tick);
  }
  render() {
    return (
      <>
       {this.props.render(this.state.data)}
      </>
    );
  }
}
