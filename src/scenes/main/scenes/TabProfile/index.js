import React, {Component} from 'react';
import FormProfile from '../components/FormProfile';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux';
import _ from 'lodash';

import NoData from '../components/NoData';
import * as dummy
    from '../../../../utils/dummy/employees';
import { dispatchUpdateEmployee } 
    from '../../../../data/employees/actionCreators';
import { ROLE_ADMIN } 
    from '../../../../utils/lib/constants';
import RoleAwareComponent 
    from '../../../../shared/RoleAwareComponent';

class TabProfile extends RoleAwareComponent {

    constructor (props) {
        super();
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            employee : props.currentEmployee ? props.currentEmployee : {},
            employeeStore: dummy.employees,
            currentGrade: ""
        }
        this.updateEmployeeForm = this.updateEmployeeForm.bind(this);
        this.getInitialEmployee = this.getInitialEmployee.bind(this);

        // Authorise
        this.authorize = [ROLE_ADMIN];
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
                                 jobFamilies={this.props.jobFamilies}
                                 updateState={this.updateEmployeeForm}
                                 onSave={this.onSave}
                                 onCancel={this.onCancel}
                                 currentGrade={this.state.employee.grades.map((grade)=> grade.endDate == null ? grade.grade : null)}
                                 roleVisible={this.shouldBeVisible()}
                        />
                    : <NoData/> }
            </div>
        );
    }

}

export default connect((state) => {
  return {
    roles: state.account.roles,
    employees: state.employees.employees,
    currentEmployee: state.employees.currentEmployee,
    jobFamilies: state.employees.jobFamilies
  }
})(muiThemeable()(TabProfile))
