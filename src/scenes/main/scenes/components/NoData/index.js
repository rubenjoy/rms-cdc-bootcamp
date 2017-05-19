import React, {Component} from 'react';

class NoData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.text ? props.text : "No Employee"
		}
	}

	render () {

	    return (
	        <div>{this.state.text}</div>
	    );
	}
}

export default NoData;
