import React, {Component} from 'react';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Pagination} from 'react-bootstrap';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux';

import EmployeeItem from '../EmployeeListItem';
import EmployeeCreateDialog from '../EmployeeCreateDialog';

import * as dummyEmployees 
    from '../../utils/dummy/employees';


const style = {
    float: "right"
};

class EmployeeListBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            dummyEmployeeStore: {
                displayedList: dummyEmployees.employees
            }
        }
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
        const { displayedList, count, loading, pagingInfo, errorMessage, resetErrorMessage, setErrorMessage } = this.state.dummyEmployeeStore;
        const { jobFamilies } = dummyEmployees.jobFamilies;

        return (
            <div id="employee-list">
                <List>
                    {this.renderEmployees()}
                </List>

                <FloatingActionButton mini={true} style={style}>
                    <ContentAdd onClick={() => {this.openCreate()}} />
                </FloatingActionButton>

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
    employees: state.employees.employees,
    currentEmployee: state.employees.currentEmployee
  }
})(muiThemeable()(EmployeeListBar))