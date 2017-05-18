import React, {Component} from 'react'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import { grey400 } from 'material-ui/styles/colors'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import {connect} from 'react-redux';
import { dispatchDeleteEmployee, setCurrentEmployee } 
    from '../../data/employees/actionCreators'

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
      setCurrentEmployee(this.props)(employee);
    }

    onDeleteEmployee(id, fullName) {
       if (confirm("Are you sure to delete this employee: " + fullName)) {
           dispatchDeleteEmployee(this.props)(id);
       }
    }

    render () {
        const employee = this.props.employee;
        const isSelected = false//Number(employee.empId) === this.state.viewingEmpId;

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
                    value={employee.EmpId}
                    leftAvatar={<Avatar src={employee.avatar} />}
                    primaryText={employee.firstName+' '+employee.lastName}
                    secondaryText={
                        <p>
                            {(employee.grades && employee.grades.length > 0) ? employee.grades[0].grade : "N/A"}, {employee.division}<br />
                            {(employee.officeLocations && employee.officeLocations.length > 0 ) ? employee.officeLocations[0].officeLocation : "N/A"}, {employee.phone}
                        </p>
                    }
                    secondaryTextLines={2}
                    onTouchTap={() => this.onSelectEmployee(employee.empId)}
                    rightIconButton={rightIconMenu(employee.empId, employee.firstName+' '+employee.lastName)}
                />
                <Divider style={dividerStyle}  />
            </div>
        );

    }


}

export default connect()(EmployeeItem)
