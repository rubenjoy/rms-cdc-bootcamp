import React, {Component} from 'react';
import FormGrade from '../components/FormGrade';
import * as _ from 'lodash';
import NoData from '../components/NoData';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RMSActions from '../../../../data/employees/actionCreators';

class TabGrade extends Component {
    constructor (props) {
        super(props);
    }
  render() {
    
    const {grades, empId, jobFamily, etag} = this.props.currentEmployee;

    const onSaveGrades = (newGrades) => {
        this.props.actions.updateGrades(newGrades, empId, etag);
    }

    return(
      <div>
        {!_.isEmpty(this.props.currentEmployee) ? 
                <FormGrade  grades={grades}
                    jobFamily={jobFamily}
                    empId={empId ? empId : 0}
                    onSaveGrades={onSaveGrades}
                    jobFamilies={this.props.jobFamilies}
                /> 
        : <NoData text={"No Grades"}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
    return {
        currentEmployee: state.employees.currentEmployee,
        jobFamilies: state.employees.jobFamilies
    };
}

const mapDispatchToProps = (dispatch) => (
    {actions: bindActionCreators(RMSActions, dispatch)}
)

export default connect(mapStateToProps, mapDispatchToProps)(TabGrade);