// Write your code here
import {Component} from 'react'

import './index.css'

const PLAY_ICON = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const PAUSE_ICON = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

class DigitalTimer extends Component {
  state = {isStart: false, timerStartInseconds: 0, timer: 25}

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({isStart: false, timerStartInseconds: 0, timer: 25})
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {timer, timerStartInseconds} = this.state
    const isTimerCompleted = timerStartInseconds === timer * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isStart: false})
    } else {
      this.setState(prevState => ({
        timerStartInseconds: prevState.timerStartInseconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isStart, timerStartInseconds, timer} = this.state
    const isTimerCompleted = timerStartInseconds === timer * 60

    if (isTimerCompleted) {
      this.setState({timerStartInseconds: 0})
    }
    if (isStart) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isStart: !prevState.isStart}))
  }

  decrementTimer = () => {
    const {timer} = this.state
    if (timer > 1) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }
  }

  IncrementTimer = () => {
    this.setState(prevState => ({timer: prevState.timer + 1}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timer, timerStartInseconds} = this.state
    const totalRemainingSeconds = timer * 60 - timerStartInseconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isStart, timer} = this.state
    const startPause = isStart ? 'Pause' : 'Start'
    const imgUrl = isStart ? PAUSE_ICON : PLAY_ICON
    const altValue = isStart ? 'pause icon' : 'play icon'
    const timerStatus = isStart ? 'Running' : 'Paused'

    return (
      <div className="container">
        <div className="digital-container">
          <h1 className="title">Digital Timer</h1>
          <div className="timer-container">
            <div className="logo-container">
              <div className="white-container">
                <h1 className="elapsed-time">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="status">{timerStatus}</p>
              </div>
            </div>
            <div className="right-container">
              <div className="time-setting-container">
                <div className="start-pause-container">
                  <button
                    type="button"
                    className="button"
                    onClick={this.onStartOrPauseTimer}
                  >
                    <img src={imgUrl} alt={altValue} className="icon" />
                    <p className="icon-name">{startPause}</p>
                  </button>
                </div>
                <div className="start-pause-container">
                  <button
                    type="button"
                    className="button"
                    onClick={this.onResetTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="icon"
                    />
                  </button>
                  <p className="icon-name">Reset</p>
                </div>
              </div>
              <p className="set-timer"> Set Timer Limit </p>
              <div className="plus-minus-container">
                {isStart ? (
                  <button type="button" className="pm-button">
                    -
                  </button>
                ) : (
                  <button
                    type="button"
                    className="pm-button"
                    onClick={this.decrementTimer}
                  >
                    -
                  </button>
                )}
                <div className="timer-increment">
                  <p className="timer-value">{timer}</p>
                </div>
                {isStart ? (
                  <button type="button" className="pm-button">
                    +
                  </button>
                ) : (
                  <button
                    type="button"
                    className="pm-button"
                    onClick={this.IncrementTimer}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
