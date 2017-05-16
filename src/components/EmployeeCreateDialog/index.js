import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FormProfile 
    from '../../scenes/main/scenes/components/FormProfile';
import FlatButton from 'material-ui/FlatButton';
import { errorMessage } from '../../utils/lib/constants';


import { connect } from 'react-redux';
import * as dummy
    from '../../utils/dummy/employees';
import { dispatchAddEmployee } 
    from '../../data/employees/actionCreators'

const dialogStyle = {
    maxWidth: 900
}
class EmployeeCreateDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employee: {},
            open: false,
            jobFamilies: dummy.jobFamilies
        }

        this.createForm = null;
        this.onCreate = this.onCreate.bind(this);
        this.updateEmployeeForm = this.updateEmployeeForm.bind(this);
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    onCancel() {
        if (confirm("Are you sure to discard changes?")) {
            this.handleClose();
        }
    }

    onCreate() {
        const { setErrorMessage, createNewEmployee } = this.props;

        if (this.refs.formProfile) {
            if (this.refs.formProfile.validateMandatoryField2(this.state.employee)) {
            
              dispatchAddEmployee(this.props, this.handleClose())(this.state.employee);
            }
        }
    }

    updateEmployeeForm (newForm) {
        this.setState({employee: newForm});
    }



    render() {

        const { jobFamilies } = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={() => this.onCancel()}
            />,
            <FlatButton
                label="Create"
                secondary={true}
                onTouchTap={() => this.onCreate()}
            />,
        ];

        return (
            <Dialog
                id="employee-create-dialog"
                title="New Employee"
                modal={true}
                open={this.state.open}
                autoScrollBodyContent={true}
                actions={actions}
                contentStyle={dialogStyle}
            >
            <FormProfile 
                id="form-profile"
                ref="formProfile"
                initialValues={this.state.employee}
                updateState={this.updateEmployeeForm}
                jobFamilies={this.state.jobFamilies} 
                isPopup={true}
            />;

            </Dialog>
        );
    }
}

EmployeeCreateDialog.propTypes = {
    jobFamilies: React.PropTypes.object,
    count: React.PropTypes.number,
    createNewEmployee: React.PropTypes.func,
    setErrorMessage: React.PropTypes.func
};

export default connect(null,null,null,{ withRef: true })(EmployeeCreateDialog)