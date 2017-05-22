import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import FormLocation from '../components/FormLocation';
import NoData from '../components/NoData';
import { offices }
    from '../../../../utils/dummy/employees';
import { dispatchUpdateLocations } 
    from '../../../../data/employees/actionCreators';


class TabLocation extends Component {
    constructor (props) {
      super(props);
      this.state = {
        offices
      }
      this.onSaveLocation = this.onSaveLocation.bind(this);
    }

    onSaveLocation (newLocations) {
        dispatchUpdateLocations(this.props)(newLocations, this.props.currentEmployee);
    }

    render () {
      const {currentEmployee} = this.props;
      const viewingEmpId = currentEmployee.empId;
      const locations = currentEmployee && 
        currentEmployee.officeLocations ? currentEmployee.officeLocations : [];
      const setErrorMessage = () => {};
      return (
        <div>
            { !_.isEmpty(currentEmployee) > 0 ?
                <FormLocation locations={locations}
                              onSave={this.onSaveLocation}
                              officeAddresses={this.state.offices ? this.state.offices : []}
                              viewingEmpId={viewingEmpId ? viewingEmpId : 0}
                              setErrorMessage = {setErrorMessage}
                /> : <NoData text={'No Locations'}/>
            }
        </div>
      );
    }
}

export default connect((state) => {
  return {
    currentEmployee: state.employees.currentEmployee
  }
})(TabLocation);