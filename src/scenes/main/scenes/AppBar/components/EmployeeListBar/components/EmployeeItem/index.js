import React, {Component} from 'react'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import { getCurrentGrade, getCurrentLocation, getEmployeeFullName } 
    from '../../../../../../../../utils/lib/employeeHelpers'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import { grey400 } from 'material-ui/styles/colors'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

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

    onSelectEmployee (id) {
      //  loadSingleEmployee(id);
    }

    onDeleteEmployee(id) {
       // if (confirm("Are you sure to delete this employee: " + fullName)) {
         //   deleteEmployee(id)
      //  }
    }

    render () {
        const employee = this.props.employee;
        const { officeLocations, grades, profile } = employee.emp;
        const { id } = employee;
        const currentLocation = officeLocations ? getCurrentLocation(officeLocations) : null;
        const currentGrade = grades ? getCurrentGrade(grades) : null;
        const fullName = getEmployeeFullName(profile);
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
                    leftAvatar={<Avatar src={profile.avatar} />}
                    primaryText={fullName}
                    secondaryText={
                        <p>
                            {currentGrade ? currentGrade.grade : "N/A"}, {profile.division}<br />
                            {currentLocation ? currentLocation.officeLocation : "N/A"}, {profile.phone}
                        </p>
                    }
                    secondaryTextLines={2}
                    onTouchTap={() => this.onSelectEmployee(id)}
                    rightIconButton={rightIconMenu(id, fullName)}
                />
                <Divider style={dividerStyle}  />
            </div>
        );

    }


}

export default EmployeeItem