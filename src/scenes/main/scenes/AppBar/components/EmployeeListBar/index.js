import React, {Component} from 'react';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {Pagination} from 'react-bootstrap'

import EmployeeItem from './components/EmployeeItem'


const style = {
    float: "right"
};

class EmployeeListBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            dummyEmployeeStore: {
                displayedList: [{a:"a"}, {a:"a"}], 
                count: 0, 
            }
        }

        this.createDialog = null;
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

    render() {
        const { displayedList, count, loading, pagingInfo, errorMessage, resetErrorMessage, setErrorMessage } = this.state.dummyEmployeeStore;
      //  const { jobFamilies } = this.props.jobFamilyStore;

        return (
            <div id="employee-list">
                <List>
                    {displayedList.map((employee, i) =>
                        <EmployeeItem key={i}
                                      employee={employee}
                        />
                    )}
                </List>

                <FloatingActionButton mini={true} style={style}>
                    <ContentAdd onClick={() => this.createDialog.handleOpen()} />
                </FloatingActionButton>
            </div>
        );
    }
}

export default EmployeeListBar