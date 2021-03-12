import React from "react";

export class C extends React.Component {
  state = {
    a: "a",
    b: "b"
  }

  componentDidMount() {
    this.setState({ a: "aa" })
    this.setState({ b: "bb" })
  }


  render() {
    console.log(this.state)
    return <div></div>
  }

}