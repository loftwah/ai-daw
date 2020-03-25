import React from 'react';
export default class AnimatedRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
    this.setState(
      this.state
    );
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
