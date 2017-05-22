import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import FormHistory from '../components/FormHistory';
import NoData from '../components/NoData';
import { dispatchUpdateProjects } 
    from '../../../../data/employees/actionCreators';

class TabHistory extends Component {

    constructor (props) {
        super(props);
        this.onSaveProjects = this.onSaveProjects.bind(this);
    }

    onSaveProjects(newProjects, currentEmployee){
        dispatchUpdateProjects(this.props)(newProjects, currentEmployee);
    }

    render () {
        const {currentEmployee} = this.props;
        const viewingEmpId = currentEmployee.empId;
        const sortedHistory = currentEmployee && currentEmployee.projects ? currentEmployee.projects : [];
        const setErrorMessage = () => {}
        const projects = sortedHistory ? sortedHistory : [];

        return (
            <div>
                { !_.isEmpty(currentEmployee)?
                    <FormHistory projects={projects}
                                 onSave={this.onSaveProjects}
                                 currentEmployee={currentEmployee}
                                 setErrorMessage={setErrorMessage}
                                 viewingEmpId={viewingEmpId ? viewingEmpId : 0}
                    /> : <NoData text={'No History'}/> }
            </div>
        );

    }

}

export default connect((state) => {
  return {
    currentEmployee: state.employees.currentEmployee
  }
})(TabHistory);