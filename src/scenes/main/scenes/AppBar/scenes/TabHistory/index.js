import React, {Component} from 'react';
import FormHistory from '../components/FormHistory';
import NoEmployee from '../components/NoEmployee';

import * as dummyEmployees 
    from '../../../../../../utils/dummy/employees'

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
        const {sortedHistory} = this.state.dummyEmployees;
        const setErrorMessage = () => {}
        const viewingEmpId = 1;
        const count = 1;
        const updateProjects = () => {}
        const projects = sortedHistory ? sortedHistory : [];

        let histForm = null;

        const onSaveProjects = (newProjects) => {

            updateProjects(newProjects, histForm);
        }

        return (
            <div>
                { count > 0 ?
                    <FormHistory projects={projects}
                                 onSave={onSaveProjects}
                                 setErrorMessage={setErrorMessage}
                                 viewingEmpId={viewingEmpId ? viewingEmpId : 0}
                                 ref={(form) => histForm = form}
                    /> : <NoEmployee/> }
            </div>
        );

    }

}

export default TabHistory