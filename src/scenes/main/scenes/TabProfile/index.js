import React, {Component} from 'react';
import NoEmployee from '../components/NoEmployee';
import RaisedButton from 'material-ui/RaisedButton';
import FormProfile from '../components/FormProfile'

import * as dummyEmployees 
    from '../../../../utils/dummy/employees'
import { genders, employeeStatusMap, maritalStatusMap } 
    from '../../../../utils/lib/employeeHelpers'


const buttonStyle = {
    float: "right",
    marginRight: 10,
    marginTop: 5
}

class TabProfile extends Component {

    constructor () {
        super();
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            employeeStore: dummyEmployees,
            dummyViewingEmpId: 0,
            dummyCount: 1
        }
    }

    onCancel () {

    }

    onSave () {

    }

    render () {

    const {employees} = this.state.employeeStore;

    const defaultProfile = (employee) => ({
        firstName: employee.firstName,
        lastName: employee.lastName,
        gender: employee.gender,
        dob: employee.dob,
        maritalStatus: employee.maritalStatus,
        phone: employee.phone,
        email: employee.email,
        empStatus: employee.empStatus,
        suspendDate: employee.suspendDate,
        hiredDate: employee.hiredDate,
        nationality: employee.nationality,
        avatar: employee.avatar,
        jobFamily: employee.jobFamily,
        division: employee.division,
        subDivision: employee.subDivision
    })

    let profileForm = null;
    const employee = employees.size > 0 ? employees.get(this.state.dummyViewingEmpId) : {};
    let profile = employee ? defaultProfile(employee) : {}

        return (
            <div>
                { this.state.dummyCount > 0 ?
                    <div>
                        <FormProfile initialValues={profile}
                        />
                        <div className="row" id="bottom-bar">
                            <RaisedButton label="Save" secondary={true} style={buttonStyle} onClick={() => this.onSave()} />
                            <RaisedButton label="Cancel" style={buttonStyle} onClick={() => this.onCancel()}  />
                        </div>
                    </div>
                    : <NoEmployee/> }
            </div>
        );
    }

}

export default TabProfile