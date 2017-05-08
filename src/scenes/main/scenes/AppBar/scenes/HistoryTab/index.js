import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import HistoryForm from '../components/HistoryForm';
import NoEmployee from '../components/NoEmployee';

class HistoryTab extends Component {

    constructor () {
        super();
    }

    render () {
        const { viewingEmpId, updateProjects, count, sortedHistory, setErrorMessage } = employeeStore;

        const projects = sortedHistory ? sortedHistory : [];

        let histForm = null;

        const onSaveProjects = (newProjects) => {

            updateProjects(newProjects, histForm);
        }

        return (
            <div>
                { count > 0 ?
                    <HistoryForm projects={projects}
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