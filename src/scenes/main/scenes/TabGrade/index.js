import React, {Component} from 'react';
import FormGrade from '../components/FormGrade';
import * as _ from 'lodash';
import NoData from '../components/NoData';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RMSActions from '../../../../data/employees/actionCreators';
import { ROLE_ADMIN } 
    from '../../../../utils/lib/constants';
import RoleAwareComponent 
    from '../../../../shared/RoleAwareComponent';

class TabGrade extends RoleAwareComponent {
    constructor (props) {
        super(props);

        // Authorise
        this.authorize = [ROLE_ADMIN];
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
                    roleVisible={this.shouldBeVisible()}
                /> 
        : <NoData text={"No Grades"}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
    return {
        roles: state.account.roles,
        currentEmployee: state.employees.currentEmployee,
        jobFamilies: state.employees.jobFamilies
    };
}

const mapDispatchToProps = (dispatch) => (
    {actions: bindActionCreators(RMSActions, dispatch)}
)

export default connect(mapStateToProps, mapDispatchToProps)(TabGrade);