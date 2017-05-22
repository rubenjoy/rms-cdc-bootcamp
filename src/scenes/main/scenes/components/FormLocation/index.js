import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Grid, Row, Col } from 'react-bootstrap';
import { pinkA200 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import { errorMessage }
    from '../../../../../utils/lib/constants'
import { generateLocId }
    from '../../../../../utils/lib/employeeHelpers';
import './index.css';


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

class FormLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locations: [],
            editMode: false
        }

        this.setStateWithPropsInitialValue(props);

    }

    setStateWithPropsInitialValue = (props) => {
        if (props.locations) {

            this.state = {
                locations: props.locations
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setStateWithPropsInitialValue(nextProps);
    }

    onCancel() {
        if (confirm("Are you sure to discard changes?")) {
            if (this.props.locations)
            {
                // console.log("initialValues: " + JSON.stringify(this.props.locations));
                const { locations } = this.props;
                this.setState({
                    locations
                });
            }
        }
    }

    address = (officeLocation) => {
        const { officeAddresses } = this.props;
        const addresses = officeAddresses.filter((f) => f.addressId === officeLocation)
        const address = addresses && addresses.length > 0 ? addresses[0] : null

        return (
            <div>
                { address && <div>{address.streetAddress}</div> }
                { address && <div>{address.city}</div> }
                { address && <div>{address.province} - {address.postCode}</div> }
            </div>
        )
    }

    handleChangeSelect = (event, index, value, name, locId) => {
        const newLocations = this.state.locations.map((g) => {
            if (g.locId === locId) {
                return {
                    ...g,
                    [name]: value
                };
            } else {
                return g;
            }
        });

        this.setState({
            locations: newLocations
        });
    }

    setToEditMode() {
        this.setState({editMode: true});
    }

    cancelEditLocs() {
        if (confirm("Are you sure to discard changes?")) {
            this.setState({
                locations: this.props.locations,
                editMode: false
            });
        }
    }

    saveEditLocs() {

        const { setErrorMessage, onSave } = this.props;
        // console.log("this.state.locations: " + JSON.stringify(this.state.locations));

        if (this.validateLocs()) {
            onSave(this.state.locations);
        }
        else {
            setErrorMessage(errorMessage.fieldValidation);
        }
    }

    validateLocs() {
        let isValid = true;
        this.state.locations.forEach((g) => {
            if (g.startDate === undefined || g.officeLocation === undefined) {
                isValid = false;
            }
        });

        return isValid;
    }

    onAddLoc = () => {
        this.setState({
            locations: [ ...this.state.locations,
                {
                    locId: generateLocId(this.props.viewingEmpId)
                }
            ]
        });
    }

    onRemoveLoc = (locId) => {
        this.setState({
            locations: this.state.locations.filter((g) => g.locId !== locId)
        });
    }

    handleChangeDate = (event, date, name, gradeId) => {
        const newLocations = this.state.locations.map((g) => {
            if (g.locId === gradeId) {
                return {
                    ...g,
                    [name]: date
                };
            } else {
                return g;
            }
        });

        this.setState({
            locations: newLocations
        });
    }

    render() {

        const { locations, editMode } = this.state;
        const { officeAddresses } = this.props;

        return (
            <div className="tab-location">
                <Grid id="tab-location-grid">
                {locations.map((item, index) => (
                    <Row key={index}>
                        <Col md={3} id="left-side">
                            <div id="month">
                                <DatePicker formatDate={(date) => moment(date).format("MMMM")}
                                            value={item.startDate ? new Date(item.startDate) : item.startDate}
                                            name="startDate"
                                            onChange={(event, date) =>  this.handleChangeDate(event, date, "startDate", item.locId)}
                                            disabled={!editMode}
                                            textFieldStyle={{width: "40%"}}
                                            errorText={!item.startDate && "This field is required"}
                                />
                                <DatePicker formatDate={(date) => moment(date).format("MMMM")}
                                            value={item.endDate ? new Date(item.endDate) : item.endDate}
                                            name="endDate"
                                            onChange={(event, date) =>  this.handleChangeDate(event, date, "endDate", item.locId)}
                                            disabled={!editMode}
                                            textFieldStyle={{width: "60%"}}
                                            style={{position: "absolute", marginTop: -48, marginLeft: 100, zIndex: 2}}
                                />
                            </div>
                            <div id="year">
                                <span id="year-start">{moment(item.startDate).format("YYYY")}</span> -
                                <span id="year-end">{item.endDate ? moment(item.endDate).format("YYYY") : "PRESENT"}</span>
                            </div>
                        </Col>
                        <Col md={9} id="right-side">
                            <SelectField
                                floatingLabelText="Office Location"
                                value={item.officeLocation}
                                onChange={(event, index, value) =>  this.handleChangeSelect(event, index, value, "officeLocation", item.locId)}
                                disabled={!editMode}
                                errorText={!item.officeLocation && "This field is required"}
                            >
                                {officeAddresses.length > 0 ? officeAddresses.map((l) => <MenuItem key={l.addressId} value={l.addressId} primaryText={l.addressId} />) : ""}
                            </SelectField>
                            {editMode ? <FontIcon className="fa fa-trash fa-1"
                                                  hoverColor={pinkA200}
                                                  onClick={() => this.onRemoveLoc(item.locId)}
                                                  style={{marginLeft: 20}}
                                /> : ""}
                            {this.address(item.officeLocation)}
                        </Col>
                        <Divider style={{ width: "60%", marginLeft: 10}} />
                    </Row>
                ))}
                </Grid>
                { editMode ?
                    <FloatingActionButton mini={true} style={fabStyle}>
                        <ContentAdd onClick={() => this.onAddLoc()} />
                    </FloatingActionButton> : ""
                }
                <div className="row" id="bottom-bar">
                    <RaisedButton label="Save" secondary={true} style={editMode ? buttonStyle : hiddenStyle}
                                  onClick={() => this.saveEditLocs()}  />
                    <RaisedButton label="Cancel" style={editMode ? buttonStyle : hiddenStyle}
                                  onClick={() => this.cancelEditLocs()}  />
                    <RaisedButton label="Edit" secondary={true} style={editMode ? hiddenStyle : buttonStyle}
                                  onClick={() => this.setToEditMode()}  />
                </div>
            </div>
        );
    }
}

FormLocation.propTypes = {
    locations: React.PropTypes.any.isRequired,
    onSave: React.PropTypes.func.isRequired,
    setErrorMessage: React.PropTypes.func.isRequired,
    officeAddresses: React.PropTypes.any.isRequired,
    viewingEmpId: React.PropTypes.number.isRequired
};

export default FormLocation