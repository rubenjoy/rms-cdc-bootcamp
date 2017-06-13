import React, {Component} from 'react';
import FormFamily from '../components/FormFamily';
import * as _ from 'lodash';
import NoData from '../components/NoData';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RMSActions from '../../../../data/employees/actionCreators';
import { ROLE_ADMIN } 
    from '../../../../utils/lib/constants';
import RoleAwareComponent 
    from '../../../../shared/RoleAwareComponent';

class TabFamily extends RoleAwareComponent {

    constructor (props) {
        super(props);

        // Authorise
        this.authorize = [ROLE_ADMIN];
    }

  render() {
    
    const {familyMembers, empId, etag} = this.props.currentEmployee;

    const onSaveFamilyMembers = (newFamilyMembers) => {
        this.props.actions.updateFamilyMembers(newFamilyMembers, empId, etag);
    }

    return(
      <div>
        {!_.isEmpty(this.props.currentEmployee) ?
        <FormFamily familyMembers={familyMembers}
                    empId={empId ? empId : 0}
                    onSaveFamilyMembers={onSaveFamilyMembers}
        /> : <NoData text={"No Family Members"}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
    return {
        roles: state.account.roles,
        currentEmployee: state.employees.currentEmployee
    };
}

const mapDispatchToProps = (dispatch) => (
    {actions: bindActionCreators(RMSActions, dispatch)}
)

export default connect(mapStateToProps, mapDispatchToProps)(TabFamily);