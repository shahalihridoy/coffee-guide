import React, { Component, Fragment } from "react";
import Topbar from "../components/Topbar";
import { Button } from "@material-ui/core";
import { getMethodDetailsWithId } from "../firebase/FirebaseService";

class MethodDetails extends Component {
  state = {
    updated: false,
    shouldShowTimer: false,
    countDownTime: "00:00",
    remainingTime: "00:00",
    targetMass: 0,
    description: "Preheat water, add beans and zero scale",
    method: {
      requirements: {}
    }
  };

  stages = [];

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

  componentWillMount() {
    let id = this.props.match.params.id;
    getMethodDetailsWithId(id).then(doc => {
      let { stages } = doc.data();
      this.stages = [...stages];
      delete doc.data().stages;
      this.setState({
        method: {
          ...doc.data()
        },
        updated: true
      });
    });
  }

  render() {
    let {
      method,
      description,
      targetMass,
      countDownTime,
      remainingTime,
      shouldShowTimer,
      updated
    } = this.state;
    return (
      <Fragment>
        <Topbar previousPage="brew" title={method.brewName} />
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
                  <h4>
                    {updated ? method.requirements.coffee.toFixed(1) : ""} grams
                  </h4>
                  <h5 className="font-weight-normal">
                    {method.requirements.coffeeText}
                  </h5>
                </div>
                <div className="pt-12">
                  <h4>
                    <u>Ground Coffee Required:</u>
                  </h4>
                  <h4>
                    {updated ? method.requirements.water.toFixed(1) : ""} mL
                  </h4>
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
