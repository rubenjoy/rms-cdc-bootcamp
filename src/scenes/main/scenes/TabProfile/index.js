import React, {Component} from 'react';
import NoEmployee from '../components/NoEmployee';
import FormProfile from '../components/FormProfile';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {bindActionCreators} from 'redux';

import { connect } from 'react-redux';
import _ from 'lodash';
import * as dummy
    from '../../../../utils/dummy/employees';
import { genders, employeeStatusMap, maritalStatusMap } 
    from '../../../../utils/lib/employeeHelpers';
import { errorMessage } 
    from '../../../../utils/lib/constants';
import { dispatchUpdateEmployee } 
    from '../../../../data/employees/actionCreators';

class TabProfile extends Component {

    constructor (props) {
        super();
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            employee : props.currentEmployee ? props.currentEmployee : {},
            employeeStore: dummy.employees,
            jobFamilies: dummy.jobFamilies,
            dummyViewingEmpId: 0,
            dummyCount: 1
        }
        debugger
        this.updateEmployeeForm = this.updateEmployeeForm.bind(this);
        this.getInitialEmployee = this.getInitialEmployee.bind(this);
       // this.getInitialEmployee(props);
    }

    onCancel () {

    }

    onSave () {
        dispatchUpdateEmployee(this.props)(this.state.employee);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.getInitialEmployee(nextProps);
        return true;
    }


    updateEmployeeForm (newForm) {
        this.setState({employee: newForm});
    }

    getInitialEmployee (props) {
        let employee = props.currentEmployee ? props.currentEmployee : {};
        this.setState({employee: employee});
    }

    render () {
        return (
            <div className="tab-profile">
                { this.state.employee && this.state.employee.email ?
                        <FormProfile initialValues={this.state.employee}
                                 jobFamilies={this.state.jobFamilies}
                                 updateState={this.updateEmployeeForm}
                                 onSave={this.onSave}
                                 onCancel={this.onCancel}
                        />
                    : <NoEmployee/> }
            </div>
        );
    }

}

export default connect((state) => {
  return {
    employees: state.employees.employees,
    currentEmployee: state.currentEmployee
  }
})(muiThemeable()(TabProfile))
