import React, {Component} from 'react';
import FormAddress from '../components/FormAddress';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import * as _ from 'lodash';

import NoData from '../components/NoData';
import { dispatchUpdateEmployee } 
    from '../../../../data/employees/actionCreators';
import { ROLE_ADMIN } 
    from '../../../../utils/lib/constants';
import RoleAwareComponent 
    from '../../../../shared/RoleAwareComponent';


class TabAddress extends RoleAwareComponent {

    constructor (props) {
        super(props);

        this.updateEmployee = this.updateEmployee.bind(this);
        this.setStateWithPropsInitialValue  = this.setStateWithPropsInitialValue.bind(this);

        this.setStateWithPropsInitialValue(props);

        // Authorise
        this.authorize = [ROLE_ADMIN];
    }

    setStateWithPropsInitialValue = (props) => {
        const { currentEmployee } = props;

        const employee = currentEmployee ? currentEmployee : {};

        const address = employee ?
            {
                streetAddress: employee.streetAddress,
                city: employee.city,
                province: employee.province,
                postCode: employee.postCode
            } : {}

        this.state = {
            employee,
            address
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setStateWithPropsInitialValue(nextProps);
    }

    updateEmployee (address) {
        let employee = update(this.state.employee, {
          streetAddress: {$set: address.streetAddress},
          city: {$set: address.city},
          province: {$set: address.province},
          postCode: {$set: address.postCode}
        });
        dispatchUpdateEmployee(this.props)(employee);
    }

    render () {
        return (
            <div>
                {!_.isEmpty(this.state.employee) ? <FormAddress initialValues={this.state.address} onSave={this.updateEmployee} 
                roleVisible={this.shouldBeVisible()}/>
                    : <NoData/>}
            </div>
        );
    }
}

export default connect((state) => {
  return {
    roles: state.account.roles,
    currentEmployee: state.employees.currentEmployee
  }
})(TabAddress)