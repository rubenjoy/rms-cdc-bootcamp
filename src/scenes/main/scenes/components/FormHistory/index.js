import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment-es6';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Grid, Row, Col } from 'react-bootstrap';
import { pinkA200 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import { errorMessage }
    from '../../../../../utils/lib/constants'
import { generateProjectId }
    from '../../../../../utils/lib/employeeHelpers';
import './index.css' ;
import 'font-awesome/css/font-awesome.css';

const buttonStyle = {
    float: "right",
    marginRight: 10,
    marginTop: 5
}
const hiddenStyle = {
    ...buttonStyle,
    display: "none"
}
const fabStyle = {
    float: "right",
    marginRight: 50,
    marginTop: -10
}

class FormHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            editMode: false
        }

        this.setStateWithPropsInitialValue(props);

    }

    setStateWithPropsInitialValue = (props) => {
        if (props.projects) {

            this.state = {
                projects: props.projects
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setStateWithPropsInitialValue(nextProps);
    }

    onCancel() {
        if (confirm("Are you sure to discard changes?")) {
            if (this.props.projects)
            {
                // console.log("initialValues: " + JSON.stringify(this.props.projects));
                const { projects } = this.props;
                this.setState({
                    projects
                });
            }
        }
    }

    setToEditMode() {
        this.setState({editMode: true});
    }

    cancelEditProjects() {
        if (confirm("Are you sure to discard changes?")) {
            this.setState({
                projects: this.props.projects,
                editMode: false
            });
        }
    }

    saveEditProjects() {
        const { setErrorMessage, onSave } = this.props;
        // console.log("this.state.projects: " + JSON.stringify(this.state.projects));

        if (this.validateProjects()) {
            onSave(this.state.projects, this.props.currentEmployee);
        }
        else {
            setErrorMessage(errorMessage.fieldValidation);
        }
    }

    validateProjects() {
        let isValid = true;
        this.state.projects.forEach((g) => {
            if (g.startDate === undefined || g.projectName === undefined) {
                isValid = false;
            }
        });

        return isValid;
    }

    onAddProject = () => {
        this.setState({
            projects: [ ...this.state.projects,
                {
                    projectId: generateProjectId(this.props.viewingEmpId)
                }
            ]
        });
    }

    onRemoveProject = (projectId) => {
        if (confirm("Are you sure to delete this project?")) {
            this.setState({
                projects: this.state.projects.filter((g) => g.projectId !== projectId)
            });
        }
    }

    handleChangeDate = (event, date, name, projectId) => {
        const newProjects = this.state.projects.map((g) => {
            if (g.projectId === projectId) {
                return {
                    ...g,
                    [name]: date
                };
            } else {
                return g;
            }
        });

        this.setState({
            projects: newProjects
        });
    }

    handleChangeText = (event, projectId) => {
        const newProjects = this.state.projects.map((g) => {
            if (g.projectId === projectId) {
                return {
                    ...g,
                    [event.target.name]: event.target.value
                };
            } else {
                return g;
            }
        });

        this.setState({
            projects: newProjects
        });
    }

    handleChangeTextJobDesc = (event, projectId, jobIdx) => {
        const newProjects = this.state.projects.map((g) => {
            if (g.projectId === projectId) {
                return {
                    ...g,
                    jobDesc: g.jobDesc.map((j, i) => {
                        if (i === jobIdx) {
                            return event.target.value;
                        }
                        else {
                            return j;
                        }
                    })
                };
            } else {
                return g;
            }
        });

        this.setState({
            projects: newProjects
        });
    }

    onRemoveJobDesc = (projectId, jobIdx) => {
        const newProjects = this.state.projects.map((g) => {
            if (g.projectId === projectId) {
                return {
                    ...g,
                    jobDesc: g.jobDesc.filter((j, i) => i !== jobIdx)
                };
            } else {
                return g;
            }
        });

        this.setState({
            projects: newProjects
        });
    }

    onAddJobDesc = (projectId) => {
        const newProjects = this.state.projects.map((g) => {
            if (g.projectId === projectId) {
                return {
                    ...g,
                    jobDesc: g.jobDesc ? [ ...g.jobDesc,
                        ""
                    ] : [ "" ]
                };
            } else {
                return g;
            }
        });

        this.setState({
            projects: newProjects
        });
    }

    render() {

        const { projects, editMode } = this.state;

        return (
            <div className="tab-history">
                <Grid fluid={true} id="tab-history-grid">
                {projects.map((item, index) => (
                    <Row key={index}>
                        {editMode ? <FontIcon className="fa fa-trash fa-1"
                                              hoverColor={pinkA200}
                                              onClick={() => this.onRemoveProject(item.projectId)}
                                              style={{ position: "absolute", zIndex: 2, marginTop: 25, marginLeft: -10}}
                            /> : ""}
                        <Col md={4} id="left-side">
                            <div id="month">
                                <DatePicker formatDate={(date) => moment(date).format("MMMM")}
                                            value={item.startDate ? new Date(item.startDate) : item.startDate}
                                            name="startDate"
                                            onChange={(event, date) =>  this.handleChangeDate(event, date, "startDate", item.projectId)}
                                            disabled={!editMode}
                                            textFieldStyle={{width: "40%"}}
                                            errorText={!item.startDate && "This field is required"}
                                />
                                <DatePicker formatDate={(date) => moment(date).format("MMMM")}
                                            value={item.endDate ? new Date(item.endDate) : item.endDate}
                                            name="endDate"
                                            onChange={(event, date) =>  this.handleChangeDate(event, date, "endDate", item.projectId)}
                                            disabled={!editMode}
                                            textFieldStyle={{width: "70%"}}
                                            style={{position: "absolute", marginTop: -48, marginLeft: 110, zIndex: 2}}
                                />
                            </div>
                            <div id="year">
                                <span id="year-start">{moment(item.startDate).format("YYYY")}</span> -
                                <span id="year-end">{item.endDate ? moment(item.endDate).format("YYYY") : "PRESENT"}</span>
                            </div>
                            <Divider inset={true} />
                            {editMode ? <TextField value={item.projectName}
                                                   style={{width: "100%"}}
                                                   name="projectName"
                                                   onChange={(event) => this.handleChangeText(event, item.projectId)}
                                                   hintText="Project Name"
                                                   errorText={!item.projectName && "This field is required"}
                                                   />
                                : <div id="project-name">{item.projectName}</div>}
                            {editMode ? <TextField value={item.role ? item.role : ""}
                                                   style={{width: "100%"}}
                                                   name="role"
                                                   onChange={(event) => this.handleChangeText(event, item.projectId)}
                                                   hintText="Role"
                                                    />
                                : <div id="role">{item.role}</div>}
                        </Col>
                        <Col md={8} id="right-side">
                            <div id="jobdesc-title">JOB DESCRIPTION</div>
                            {editMode ? <FontIcon className="fa fa-plus-circle fa-1"
                                      hoverColor={pinkA200}
                                      onClick={() => this.onAddJobDesc(item.projectId)}
                                      style={{ position: "absolute", zIndex: 2, marginLeft: 140, marginTop: -25}}
                            /> : "" }
                            <div id="jobdesc">
                                <ul>
                                    {item.jobDesc ? item.jobDesc.map((jobdesc, index) =>
                                            <li key={index}>
                                                { editMode ? <div>
                                                        <TextField value={jobdesc}
                                                                      style={{width: "100%"}}
                                                                      name="role"
                                                                      onChange={(event) => this.handleChangeTextJobDesc(event, item.projectId, index)}
                                                                      hintText="Job Description"
                                                        />
                                                        <FontIcon className="fa fa-trash fa-1"
                                                                  hoverColor={pinkA200}
                                                                  onClick={() => this.onRemoveJobDesc(item.projectId, index)}
                                                                  style={{ position: "absolute", zIndex: 2, marginLeft: -10, marginTop: 10}}
                                                        />
                                                    </div>
                                                : <div>{jobdesc}</div>}
                                            </li>
                                    ) : ""}
                                </ul>
                            </div>

                        </Col>
                        <Divider style={{ marginLeft: 10}} />
                    </Row>
                ))}
                </Grid>
                { editMode ?
                    <FloatingActionButton mini={true} style={fabStyle}>
                        <ContentAdd onClick={() => this.onAddProject()} />
                    </FloatingActionButton> : ""
                }
                { this.props.roleVisible ? (
                <div className="row" id="bottom-bar">
                    <RaisedButton label="Save" secondary={true} style={editMode ? buttonStyle : hiddenStyle}
                                  onClick={() => this.saveEditProjects()}  />
                    <RaisedButton label="Cancel" style={editMode ? buttonStyle : hiddenStyle}
                                  onClick={() => this.cancelEditProjects()}  />
                    <RaisedButton label="Edit" secondary={true} style={editMode ? hiddenStyle : buttonStyle}
                                  onClick={() => this.setToEditMode()}  />
                </div> ) : null}
            </div>
        );
    }
}

FormHistory.propTypes = {
    projects: React.PropTypes.any.isRequired,
    onSave: React.PropTypes.func.isRequired,
    setErrorMessage: React.PropTypes.func.isRequired,
    viewingEmpId: React.PropTypes.number.isRequired
};

export default FormHistory