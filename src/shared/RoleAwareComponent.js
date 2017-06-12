import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

class RoleAwareComponent extends Component {

	constructor (props) {
		super(props);
		this.authorize = [];

		this.shouldBeVisible = this.shouldBeVisible.bind(this);
	}

	shouldBeVisible () {
		const roles = this.props.roles;
		if (roles) {
			return _.intersection(this.authorize, roles).length > 0;
		}

		return false;
	}
}

export default RoleAwareComponent;

