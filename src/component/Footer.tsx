import React, { Component } from 'react'

export default class Footer extends Component {
  handleButtonClick = function () {
    console.log(this)
  }

  render() {
    // this.handleButtonClick = this.handleButtonClick.bind(this)
    return (
      <div>
        <button onClick={this.handleButtonClick}>Click me</button>
      </div>
    )
  }
}
