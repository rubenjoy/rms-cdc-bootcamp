import React, {Component} from 'react';
import FormFamily from '../components/FormFamily';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RMSActions from '../../../../data/employees/actionCreators';

class TabFamily extends Component {

  render() {
    
    const {familyMembers, empId, etag} = this.props.currentEmployee;

    const defaultFamilyMembers = (familyMembers) => ({
      name: familyMembers.name,
      gander: familyMembers.gender,
      dob: familyMembers.dob,
      relation: familyMembers.relation,
      active: familyMembers.active
    });



    const onSaveFamilyMembers = (newFamilyMembers) => {
        this.props.actions.updateFamilyMembers(newFamilyMembers, empId, etag);
    }

    return(
      <div>
        <FormFamily familyMembers={familyMembers}
                    empId={empId ? empId : 0}
                    onSaveFamilyMembers={onSaveFamilyMembers}
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

export default connect(mapStateToProps, mapDispatchToProps)(TabFamily);