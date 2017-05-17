import React, {Component} from 'react';
import NoEmployee from '../components/NoEmployee';
import RaisedButton from 'material-ui/RaisedButton';
import FormGrade from '../components/FormGrade';

import * as dummyEmployees 
    from '../../../../utils/dummy/employees'
import { genders, employeeStatusMap, maritalStatusMap } 
    from '../../../../utils/lib/employeeHelpers'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RMSActions from '../../../../data/employees/actionCreators';
 
const buttonStyle = {
    float: "right",
    marginRight: 10,
    marginTop: 5
}

class TabGrade extends Component {
  constructor() {
    super();
  }

  render() {
    
    const {grades, empId, jobFamily, etag} = this.props.currentEmployee;

    const defaultGrade = (grades) => ({
      ds: grades.ds,
      grade: grades.grade,
      startDate: grades.startDate,
      endDate: grades.endDate
    });

    const onSaveGrades = (newGrade) => {
      this.props.actions.updateGrades(newGrade, empId, etag);
    }

    return(
      <div>
        <FormGrade  grades={grades}
                    jobFamily={jobFamily}
                    empId={empId ? empId : 0}
                    onSaveGrades={onSaveGrades}
        /> 
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
    return {
        currentEmployee: state.employees.currentEmployee
    };
}

const mapDispatchToProps = (dispatch) => (
    {actions: bindActionCreators(RMSActions, dispatch)}
)

export default connect(mapStateToProps, mapDispatchToProps)(TabGrade);