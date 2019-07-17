import React, { Component, Fragment } from "react";
import Topbar from "../components/Topbar";
import { Button } from "@material-ui/core";

class MethodDetails extends Component {
  state = {
    shouldShowTimer: false,
    countDownTime: "00:00",
    remainingTime: "00:00",
    targetMass: 0,
    description: "Preheat water, add beans and zero scale",
    method: {
      img: "/assets/images/4.png",
      name: "La huella",
      requirements: {
        coffee: 56,
        coffeeText: "The suggested grain size is between course and medium",
        water: 250,
        waterText: "Preferabley between 85 and 95 centigrade",
        time: 35
      }
    }
  };

  stages = [
    {
      time: 5,
      mass: 50,
      description: "Evenly pre-infuse beans up to target"
    },
    {
      time: 10,
      mass: 100,
      description: "Evenly infuse beans and maintain water level"
    },
    {
      time: 20,
      mass: 100,
      description: "Compress aeropress in given time"
    },
    {
      description: "Dilute the concentrate with 130g water"
    }
  ];

  minute;
  second;
  remainder;
  timer;

  showTimer = () => {
    this.setState({
      shouldShowTimer: true
    });
  };

  formatTime = time => {
    this.minute = Math.floor(time / 60);
    this.second = Math.floor(time % 60);
    this.minute < 10
      ? (this.minute = `0${this.minute}`)
      : (this.minute = `${this.minute}`);
    this.second < 10
      ? (this.second = `0${this.second}`)
      : (this.second = `${this.second}`);

    return `${this.minute}:${this.second}`;
  };

  startCountDown = () => {
    let stage = 0;
    let stageTime = this.stages[0].time;

    if (this.timer) clearInterval(this.timer);

    let { requirements } = this.state.method;
    let counter = 1;

    this.timer = setInterval(() => {
      if (counter > requirements.time) {
        clearInterval(this.timer);
      } else {
        // change stage tags
        if (counter > stageTime) {
          stage++;
          stageTime += this.stages[stage].time;
        }

        // check if it is the last stage
        counter === this.state.method.requirements.time
          ? this.setState({
              description: this.stages[stage + 1].description,
              targetMass: "0",
              countDownTime: this.formatTime(counter),
              remainingTime: this.formatTime(
                this.state.method.requirements.time - counter
              )
            })
          : this.setState({
              description: this.stages[stage].description,
              targetMass: this.stages[stage].mass,
              countDownTime: this.formatTime(counter),
              remainingTime: this.formatTime(
                this.state.method.requirements.time - counter
              )
            });
        counter++;
      }
    }, 1000);
  };

  resetCountdown = () => {
    if (this.timer) clearInterval(this.timer);
    this.setState({
      countDownTime: "00:00",
      targetMass: 0,
      description: "Preheat water, add beans and zero scale",
      remainingTime: this.formatTime(this.state.method.requirements.time)
    });
  };

  render() {
    let {
      method,
      description,
      targetMass,
      countDownTime,
      remainingTime,
      shouldShowTimer
    } = this.state;
    return (
      <Fragment>
        <Topbar previousPage="brew" title="pourover (v60)" />
        <div className="method-details bg-dark pb-16">
          <div className="brand-image-holder mb-8 position-relative">
            <img src={method.img} alt="method" />
            <div className="brand-details pl-16 pb-8">
              <h4 className="text-white uppercase">{method.name}</h4>
            </div>
          </div>
          {!shouldShowTimer ? (
            <Fragment>
              <div className="card mt-8 mx-16 bg-light-gray py-24 px-20">
                <div className="pb-12">
                  <h4>
                    <u>Ground Coffee Required:</u>
                  </h4>
                  <h4>{method.requirements.coffee.toFixed(1)} grams</h4>
                  <h5 className="font-weight-normal">
                    {method.requirements.coffeeText}
                  </h5>
                </div>
                <div className="pt-12">
                  <h4>
                    <u>Ground Coffee Required:</u>
                  </h4>
                  <h4>{method.requirements.water.toFixed(1)} mL</h4>
                  <h5 className="font-weight-normal">
                    {method.requirements.waterText}
                  </h5>
                </div>
              </div>

              <div className="mt-16 w-100 text-center">
                <Button
                  className="brew-button py-12"
                  variant="contained"
                  color="primary"
                  onClick={this.showTimer}
                >
                  Start Brewing
                </Button>
              </div>
            </Fragment>
          ) : (
            <div className="timer m-16 py-24 card text-center">
              <h1 className="mb-0">{countDownTime}</h1>
              <h4 className="text-muted mb-0">
                {remainingTime} total remaining
              </h4>
              <div className="flex flex-center mt-20">
                <Button
                  variant="contained"
                  color="secondary"
                  className="capitalize mr-16 w-130 py-8"
                  onClick={this.resetCountdown}
                >
                  reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="capitalize w-130 py-8"
                  onClick={this.startCountDown}
                >
                  start brewing
                </Button>
              </div>

              <div className="mt-20 px-16">
                <h4 className="text-muted mb-0">{description}</h4>
                <h4 className="text-muted mt-24">
                  <u>Target Mass</u>
                </h4>
                <h4 className="text-muted">{targetMass}g</h4>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default MethodDetails;
