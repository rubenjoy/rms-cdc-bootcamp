import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { redA200 } from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import { generateMemberID }
    from '../../../../../utils/lib/employeeHelpers';
import { genders, relations }
    from '../../../../../utils/lib/constants';


const buttonStyle = {
    float: "right",
    marginRight: 25,
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
};
const buttomBar = {
  backgroundColor: '#5c6bc0',
  height: '48px',
  marginTop: '40px'
}

class FormFamily extends Component {

    constructor(props) {
        super(props);
        this.state = {
          editMode: false,
          familyMembers: this.props.familyMembers
        }
    }

    componentWillReceiveProps = (nextProps) => {
      this.setState({familyMembers: nextProps.familyMembers})
    }

    setToEditMode() {
        this.setState({editMode: true});
    }

    cancelEditFamilyMembers() {
        if (confirm("Are you sure to discard changes?")) {
            this.setState({
                familyMembers: this.props.familyMembers,
                editMode: false
            });
        }
    }

    validateMandatoryField (newFamilyMembers){
      let isValid = true;
      newFamilyMembers.map((familyMember)=>{
        if (familyMember.name === "" || familyMember.gender === "" || familyMember.dob === null || familyMember.relation===""){
          isValid = false
        }
        return isValid;
      })
    } 

    saveEditFamilyMembers () {
        if (this.validateMandatoryField(this.state.familyMembers)){
            this.props.onSaveFamilyMembers(this.state.familyMembers);
            this.setState({editMode: false});
        }
    }

    handleChangeText = (event, famId) => {
        const newFamilyMembers = this.state.familyMembers.map((g) => {
            if (g.famId === famId) {
                return {
                    ...g,
                    [event.target.name]: event.target.value
                };
            } else {
                return g;
            }
        });

        this.setState({
            familyMembers: newFamilyMembers
        });
    }

    handleChangeDate = (event, date, name, famId) => {
        const newFamilyMembers = this.state.familyMembers.map((g) => {
            if (g.famId === famId) {
                return {
                    ...g,
                    [name]: date
                };
            } else {
                return g;
            }
        });

        this.setState({
            familyMembers: newFamilyMembers
        });
    }

    handleChangeSelect = (event, index, value, name, famId) => {
        const newFamilyMembers = this.state.familyMembers.map((g) => {
            if (g.famId === famId) {
                return {
                    ...g,
                    [name]: value
                };
            } else {
                return g;
            }
        });

        this.setState({
            familyMembers: newFamilyMembers
        });
    }

    handleChangeChecked = (event, famId) => {
        const newFamilyMembers = this.state.familyMembers.map((g) => {
            if (g.famId === famId) {
                return {
                    ...g,
                    [event.target.name]: event.target.checked
                };
            } else {
                return g;
            }
        });

        this.setState({
            familyMembers: newFamilyMembers
        });
    }

    onAddFamilyMembers = () => {
        this.setState({
            familyMembers: [ ...this.state.familyMembers,
                { famId: generateMemberID(this.props.empId), name: "", gender: "", dob: null,relation:"", active: false }
                ]
        });
    }

    onRemoveFamilyMember = (famId) => {
        this.setState({
            familyMembers: this.state.familyMembers.filter((g) => g.famId !== famId)
        });
    }

    render() {
      const {editMode} = this.state;
      const familyMembers = this.state.familyMembers ? this.state.familyMembers : [];
      
        return (
            <div>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Gender</TableHeaderColumn>
                            <TableHeaderColumn>DOB</TableHeaderColumn>
                            <TableHeaderColumn>Type</TableHeaderColumn>
                            <TableHeaderColumn>Active</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {familyMembers.map( (familyMember, index) => (
                            <TableRow key={index} selectable={false}>
                                <TableRowColumn>
                                  {
                                    editMode ?
                                    (<div><TextField
                                                errorText={!familyMember.name && "This field is required"} 
                                                value={familyMember.name} 
                                                name="name"
                                                onChange={(event) => this.handleChangeText(event, familyMember.famId)}
                                              />
                                      </div>)                                    
                                    : <div>{familyMember.name}</div>
                                  }
                                </TableRowColumn>
                                <TableRowColumn>
                                  {editMode ? (<SelectField 
                                                    name="gender"
                                                    label="Gender"
                                                    value={familyMember.gender}
                                                    onChange={(event, index, value) =>  this.handleChangeSelect(event, index, value, "gender", familyMember.famId)}
                                                    errorText={!familyMember.gender && "This field is required"}
                                                >
                                            {genders.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                        </SelectField>)
                                  :<div>{familyMember.gender}</div>}
                                </TableRowColumn>
                                <TableRowColumn>
                                  {
                                    editMode ?
                                    (<DatePicker 
                                        value={familyMember.dob ? new Date(familyMember.dob) : familyMember.dob} name="dob"
                                        onChange={(event, date) =>  this.handleChangeDate(event, date, "dob", familyMember.famId)}
                                        errorText={!familyMember.dob && "This field is required"}
                                        formatDate={(date) => moment(date).format("D MMM YYYY")} />)
                                    :<div>{moment(familyMember.startDate).format("D MMM YYYY")}</div>
                                  }
                                </TableRowColumn>
                                <TableRowColumn>
                                  {
                                    editMode ?
                                    (<SelectField 
                                        name="relation"
                                        label="Relation"
                                        value={familyMember.relation}
                                        errorText={!familyMember.relation && "This field is required"}
                                        onChange={(event, index, value) =>  this.handleChangeSelect(event, index, value, "relation", familyMember.famId)}>
                                            {relations.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                    </SelectField>)
                                    :<div>{familyMember.relation}</div>
                                  }
                                </TableRowColumn>
                                <TableRowColumn>
                                    <input type="checkbox"
                                            name="active"
                                            value={familyMember.active}
                                            checked={familyMember.active}
                                            disabled={!editMode}
                                            onChange={(event) => this.handleChangeChecked(event, familyMember.famId)}
                                    />
                                </TableRowColumn>
                                <TableRowColumn>
                                  {
                                    editMode ?
                                    <DeleteIcon 
                                        hoverColor={redA200}
                                        onClick={() => this.onRemoveFamilyMember(familyMember.famId)} /> : ""
                                  }
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                { editMode ?
                    <FloatingActionButton mini={true} style={fabStyle}>
                        <ContentAdd onClick={() => this.onAddFamilyMembers()} />
                    </FloatingActionButton> : ""
                }
                <div className="row" style={buttomBar}>
                    <RaisedButton label="Save" secondary={true} style={editMode ? buttonStyle : hiddenStyle}
                                  onClick={() => this.saveEditFamilyMembers()}  />
                    <RaisedButton label="Cancel" style={editMode ? buttonStyle : hiddenStyle}
                                  onClick={() => this.cancelEditFamilyMembers()}  />
                    <RaisedButton label="Edit" secondary={true} style={editMode ? hiddenStyle : buttonStyle}
                                  onClick={() => this.setToEditMode()}  />
                </div>
            </div>
        );
    }
}


export default FormFamily;
