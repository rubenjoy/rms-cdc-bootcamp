import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import { redA200, pinkA200 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import { generateGradeID }
    from '../../../../../utils/lib/employeeHelpers';


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
};
const buttomBar = {
  backgroundColor: '#5c6bc0',
  height: '48px',
  marginTop: '40px'
}

class FormGrade extends Component {

    constructor(props) {
        super(props);
        this.state = {
          editMode: false,
          grades: this.props.grades,
          minDS: "",
          maxDS: ""
        }
    }

    componentWillReceiveProps (nextProps) {
        // this.setState({grades: nextProps.grades});
        const { grades, jobFamily, jobFamilies } = nextProps;
        const jf = jobFamilies.filter((j) => j.jfCode === jobFamily)[0];

        this.setState({
            grades: grades,
            minDS: jf ? jf.minDs : "",
            maxDS: jf ? jf.maxDs : ""
        });
    }

    setToEditMode() {
        this.setState({editMode: true});
    }

    cancelEditGrades() {
        if (confirm("Are you sure to discard changes?")) {
            this.setState({
                grades: this.props.grades,
                editMode: false
            });
        }
    }

    validateMandatoryField (newGrades){
      let isValid = true;
      newGrades.map((grade)=>{
        if (grade.ds === 0 || grade.startDate === null){
          isValid = false
        }
        return isValid;
      })
      return isValid;
    } 

    saveEditGrades () {
        if (this.validateMandatoryField(this.state.grades)){
            this.props.onSaveGrades(this.state.grades);
            this.setState({editMode: false});
        }
    }

    onDSChange = (ds,gradeId) => {
        const jf = this.props.jobFamilies.filter((j) => j.jfCode === this.props.jobFamily)[0];
        const currentGrade = jf.jfLevels.filter((g) => ds >= g.minDs && ds <= g.maxDs)[0];
        const selectedGrade = currentGrade ? currentGrade.grade : ""

      const newGrades = this.state.grades.map((grade) => {
        if (grade.gradeId === gradeId) {
          return {
            ...grade,
            ds: ds,
            grade: selectedGrade
          };
        } else {
          return grade;
        }
      });

      this.setState({
          grades: newGrades
      });
    }

    handleChangeDate = (event, date, name, gradeId) => {
        const newGrades = this.state.grades.map((g) => {
            if (g.gradeId === gradeId) {
                return {
                    ...g,
                    [name]: date
                };
            } else {
                return g;
            }
        });

        this.setState({
            grades: newGrades
        });
    }

    onAddGrade = () => {
        this.setState({
            grades: [ ...this.state.grades,
                { gradeId: generateGradeID(this.props.empId),ds:"",grade:"",startDate: null,endDate:null }
                ]
        });
    }

    onRemoveGrade = (gradeId) => {
        this.setState({
            grades: this.state.grades.filter((g) => g.gradeId !== gradeId)
        });
    }

    render() {
      const {editMode} = this.state;
      const grades = this.state.grades ? this.state.grades : [];     
        return (
            <div>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>DS</TableHeaderColumn>
                            <TableHeaderColumn>Grade</TableHeaderColumn>
                            <TableHeaderColumn>Start Date</TableHeaderColumn>
                            <TableHeaderColumn>End Date</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {grades.map( (grade, index) => (
                            <TableRow key={index} selectable={false}>
                                <TableRowColumn>
                                  {
                                    editMode ?
                                    (<div>DS <TextField
                                                errorText={grade.ds<1 && "This field is required"} 
                                                type="number" value={grade.ds} name="ds"
                                                onChange={(evt, ds) => this.onDSChange(ds, grade.gradeId)}
                                                style={{width: "40%"}}
                                                min={0}
                                                max={20}
                                              />
                                      </div>)                                    
                                    : <div>DS{grade.ds}</div>
                                  }
                                </TableRowColumn>
                                <TableRowColumn>
                                  {editMode ? (<TextField value={grade.grade} name="grade" disabled={true} />)
                                  :<div>{grade.grade}</div>}
                                </TableRowColumn>
                                <TableRowColumn>
                                  {
                                    editMode ?
                                    (<DatePicker value={grade.startDate ? new Date(grade.startDate) : grade.startDate} name="startDate"
                                                             onChange={(event, date) =>  this.handleChangeDate(event, date, "startDate", grade.gradeId)}
                                                             errorText={!grade.startDate && "This field is required"}
                                                             formatDate={(date) => moment(date).format("D MMMM YYYY")} />)
                                    :<div>{moment(grade.startDate).format("D MMM YYYY")}</div>
                                  }
                                </TableRowColumn>
                                <TableRowColumn>
                                  {
                                    editMode ?
                                    (<div><DatePicker value={grade.endDate ? new Date(grade.endDate) : grade.endDate} name="endDate"
                                                             onChange={(event, date) =>  this.handleChangeDate(event, date, "endDate", grade.gradeId)}
                                                             formatDate={(date) => moment(date).format("D MMM YYYY")} />
                                            <FontIcon className="fa fa-refresh fa-1"
                                                      hoverColor={pinkA200}
                                                      style={{ position: "absolute", marginTop: -35, marginLeft: 120, zIndex: 2}}
                                                      onClick={() => this.onRefreshDate(grade.gradeId)}
                                            />
                                        </div>)
                                    :<div>{grade.endDate ? moment(grade.endDate).format("D MMM YYYY") : "-"}</div>
                                  }
                                </TableRowColumn>
                                <TableRowColumn>
                                  {
                                    editMode ?
                                    <DeleteIcon 
                                        hoverColor={redA200}
                                        onClick={() => this.onRemoveGrade(grade.gradeId)} /> : ""
                                  }
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                { editMode ?
                    <FloatingActionButton mini={true} style={fabStyle}>
                        <ContentAdd onClick={() => this.onAddGrade()} />
                    </FloatingActionButton> : ""
                }
                <div className="row" style={buttomBar}>
                    <RaisedButton label="Save" secondary={true} style={editMode ? buttonStyle : hiddenStyle}
                                  onClick={() => this.saveEditGrades()}  />
                    <RaisedButton label="Cancel" style={editMode ? buttonStyle : hiddenStyle}
                                  onClick={() => this.cancelEditGrades()}  />
                    <RaisedButton label="Edit" secondary={true} style={editMode ? hiddenStyle : buttonStyle}
                                  onClick={() => this.setToEditMode()}  />
                </div>
            </div>
        );
    }
}


export default FormGrade
