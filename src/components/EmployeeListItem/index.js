import React, {Component} from 'react'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import { getCurrentGrade, getCurrentLocation, getEmployeeFullName } 
    from '../../utils/lib/employeeHelpers'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import { grey400 } from 'material-ui/styles/colors'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RMSActions from '../../data/employees/actionCreators';

class EmployeeItem extends Component {

    constructor () {
        super();
        this.state = {
            dummyEmployeeStore: {
                viewingEmpId: 1, 
                deleteEmployee: () => {}, 
                loadSingleEmployee: () => {}

            }
        }
        this.onDeleteEmployee = this.onDeleteEmployee.bind(this);
        this.onSelectEmployee = this.onSelectEmployee.bind(this);
    }

    onSelectEmployee (employee) {
      this.props.actions.setCurrentEmployee(employee);
    }

    onDeleteEmployee(id) {
       // if (confirm("Are you sure to delete this employee: " + fullName)) {
         //   deleteEmployee(id)
      //  }
    }

    render () {
        // Employee data should be here, Yos
        console.log(this.props);

        const employee = this.props.employee;
        const { officeLocations, grades } = employee;
        const { id } = employee;
        const currentLocation = officeLocations ? getCurrentLocation(officeLocations) : null;
        const currentGrade = grades ? getCurrentGrade(grades) : null;
        const fullName = getEmployeeFullName(employee);
        const { viewingEmpId, deleteEmployee, loadSingleEmployee } = this.state.dummyEmployeeStore;
        const isSelected = Number(id) === viewingEmpId;

        const iconButtonElement = (
            <IconButton
                touch={true}
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        )

        const rightIconMenu = (id, fullName) => (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={() => this.onDeleteEmployee(id, fullName)}>Delete</MenuItem>
            </IconMenu>
        )

        const dividerStyle = {
            backgroundColor: isSelected? "#FF4081" : "#E0E0E0"
        }

        return (
            <div >
                <ListItem
                    value={id}
                    leftAvatar={<Avatar src={employee.avatar} />}
                    primaryText={fullName}
                    secondaryText={
                        <p>
                            {currentGrade ? currentGrade.grade : "N/A"}, {employee.division}<br />
                            {currentLocation ? currentLocation.officeLocation : "N/A"}, {employee.phone}
                        </p>
                    }
                    secondaryTextLines={2}
                    onTouchTap={() => this.onSelectEmployee(employee)}
                    rightIconButton={rightIconMenu(id, fullName)}
                />
                <Divider style={dividerStyle}  />
            </div>
        );

    }


}

const mapDispatchToProps = (dispatch) => (
    {actions: bindActionCreators(RMSActions, dispatch)}
)

export default connect(null, mapDispatchToProps)(EmployeeItem)