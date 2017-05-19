import React, {Component} from 'react';
import { connect } from 'react-redux';

import FormHistory from '../components/FormHistory';
import NoData from '../components/NoData';
import * as dummyEmployees 
    from '../../../../utils/dummy/employees';
import { dispatchUpdateProjects } 
    from '../../../../data/employees/actionCreators';

class TabHistory extends Component {

    constructor () {
        super();
        this.state = {
            employeeStore: dummyEmployees,
            dummyViewingEmpId: 0,
            dummyCount: 1
        }
    }

    render () {
        const {currentEmployee} = this.props;
        const sortedHistory = currentEmployee && currentEmployee.projects ? currentEmployee.projects : [];
        const setErrorMessage = () => {}
        const viewingEmpId = 1;
        const projects = sortedHistory ? sortedHistory : [];
        const count = projects ? projects.length : 0;

        let histForm = null;
        const onSaveProjects = (newProjects, currentEmployee) => {
            dispatchUpdateProjects(this.props)(newProjects, histForm, currentEmployee);
        }

        return (
            <div>
                { count > 0 ?
                    <FormHistory projects={projects}
                                 onSave={onSaveProjects}
                                 currentEmployee={currentEmployee}
                                 setErrorMessage={setErrorMessage}
                                 viewingEmpId={viewingEmpId ? viewingEmpId : 0}
                                 ref={(form) => histForm = form}
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