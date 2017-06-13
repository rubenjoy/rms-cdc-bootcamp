import React, {Component} from 'react';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux';

import EmployeeItem from '../EmployeeListItem';
import EmployeeCreateDialog from '../EmployeeCreateDialog';

import * as dummyEmployees 
    from '../../utils/dummy/employees';

import { ROLE_ADMIN } 
    from '../../utils/lib/constants';
import RoleAwareComponent 
    from '../../shared/RoleAwareComponent';
import './index.css' ;


const style = {
    float: "right"
};

class EmployeeListBar extends RoleAwareComponent {

    constructor(props) {

        super(props);

        this.state = {
            activePage: 1,
            dummyEmployeeStore: {
                displayedList: dummyEmployees.employees
            }
        }

        // Authorise
        this.authorize = [ROLE_ADMIN];
    }

    createNewEmployee = (newEmployee) => {
        const { addNewEmployee} = this.props.employeeStore;

        addNewEmployee(newEmployee, this.createDialog);
    }

    handleSelectPage = (eventKey) => {
        // console.log("page: " + eventKey);
        this.setState({activePage: eventKey});

        const { setCurrentPage, refreshListEmployees  } = this.props.employeeStore;
        setCurrentPage(eventKey);

        refreshListEmployees();
    }

    renderEmployees() {
        return this.props.employees.map((employee, idx) => {
            return (
                <EmployeeItem key={idx}
                            employee={employee}
                />
            );
        });
    }

    openCreate() {
        this.refs.createDialog.wrappedInstance.handleOpen();
    }

    render() {
        const {  count, setErrorMessage } = this.state.dummyEmployeeStore;
        const { jobFamilies } = dummyEmployees.jobFamilies;

         return (
            <div id="employee-list">
                <List>
                    {this.renderEmployees()}
                </List>

                {this.shouldBeVisible() ?
                    (
                        <FloatingActionButton id="add-button" mini={true} style={style}>
                            <ContentAdd onClick={() => {this.openCreate()}} />
                        </FloatingActionButton>
                    ) : null
                }
                <EmployeeCreateDialog id="create-dialog"
                       ref="createDialog"
                       jobFamilies={jobFamilies}
                       count={count}
                       createNewEmployee={this.createNewEmployee}
                       setErrorMessage={setErrorMessage}
                />
            </div>
        );

    }
}

export default connect((state) => {
  return {
    roles: state.account.roles,
    employees: state.employees.employees,
    currentEmployee: state.employees.currentEmployee
  }
})(muiThemeable()(EmployeeListBar))