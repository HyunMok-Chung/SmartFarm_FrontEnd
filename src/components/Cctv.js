import React, { Component } from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';

class Hello extends Component {
	render() {
		return (
			<div>
				<h1>im hello</h1>
				<a
					onClick={function (e) {
						e.preventDefault();
						this.props.getMessage();
					}.bind(this)}>{this.props.message}</a>
			</div>
		);
	}
}
class Cctv extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: { test: "who am i" }
		}
	}
	render() {
		return (
			<div className="App">
				<Hello
					message={this.state.message.test}
					getMessage={
						function (e) {
							//this.setState({ message: { test: "fuck" } });
							console.log("받아옵니다");
							fetch('http://localhost:3001/Cctv')
								.then(res => res.json())
								.then(data => this.setState({ message: { test: data.test } }));
						}.bind(this)
					}></Hello>
			</div >
		);
	}
}

export default Cctv;
