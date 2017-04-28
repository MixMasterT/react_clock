import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: null,
      mins: null,
      secs: null,
      amPm: null,
      clockInterval: null,
    }

    this.tick = this.tick.bind(this);
    this.pad = this.pad.bind(this);

  }

  componentWillMount() {
    const currentTime = new Date().toLocaleTimeString();
    const amPm = currentTime.split(" ")[1];
    const time = currentTime.split(" ")[0];
    const [hours, mins, secs] = time.split(":");
    this.setState({ hours, mins, secs, amPm });
    this.tick();
  }

  pad(num) {
    if (num < 10) {
      return "0" + num;
    }
    else {
      return num;
    }
  }

  tick() {
    const clockInterval = setInterval(() => {
      let { secs, mins, hours, amPm } = this.state;

      if (this.state.secs === 59) {
        secs = 0;

        if (this.state.mins === 59) {
          mins = 0;

          if (hours === 12) {
            hours = 1;
            amPm = this.state.amPm === 'AM' ? 'PM' : 'AM';
          }

          else {
            hours++;
          }
        }

        else {
          mins++;
        }
      }

      else {
        secs++;
      }

      this.setState({ hours, mins, secs, amPm });

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.clockInterval);
  }

  render() {
    return (
      <h1>{this.state.hours}:{
            this.pad(this.state.mins)}:{
            this.pad(this.state.secs)}{
            ` ${this.state.amPm}`}
      </h1>
    )
  }
}

export default Clock;
