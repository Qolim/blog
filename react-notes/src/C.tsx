import React from "react";

const p = new Promise((res, rej) => {
  setTimeout(() => {
    res("111")
  }, 1000);
})

export class C extends React.Component {
  state = {
    a: "a",
    b: "b"
  }

  componentDidMount() {
    this.setState({ a: "aa" })
    this.setState({ b: "bb" })
    p.then(res => {
      this.setState({ a: res })
      console.log(this.state)
    })
  }


  render() {
    return <div></div>
  }

}