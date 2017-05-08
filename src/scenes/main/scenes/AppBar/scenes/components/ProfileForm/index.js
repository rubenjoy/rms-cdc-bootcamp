import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import { genders, employeeStatusMap, maritalStatusMap } 
    from '../../../../../../../utils/lib/constants'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import { pinkA200 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';



const avatarStyle = {
    marginTop: 10,
    height: 100,
    width: 100
}

const cameraPickStyle = {
    position: "absolute",
    zIndex: 2,
    marginTop: 10,
    marginLeft: -20
}

class ProfileForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile: {}
        }

        this.setStateWithPropsInitialValue(props);

    }

    setStateWithPropsInitialValue = (props) => {
        const { initialValues, jobFamilies, currentGrade } = props;
        if (initialValues && jobFamilies) {
            const jf = jobFamilies.filter((j) => j.jfCode === initialValues.jobFamily)
            const divisions = jf && jf.length > 0 ? jf[0].divisions : []
            const sdiv = divisions.filter((j) => j.divCode === initialValues.division)
            const subDivisions = sdiv && sdiv.length > 0 ? sdiv[0].subDivisions : []

            this.state = {
                profile: {
                    ...initialValues,
                    firstName: initialValues.firstName ? initialValues.firstName : "",
                    lastName: initialValues.lastName ? initialValues.lastName : "",
                    phone: initialValues.phone ? initialValues.phone : "",
                    email: initialValues.email ? initialValues.email : "",
                    nationality: initialValues.nationality ? initialValues.nationality : ""
                },
                currentGrade,
                divisions,
                subDivisions
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setStateWithPropsInitialValue(nextProps);
    }

    handleChangeText = (event) => this.setState({
        profile: {
            ...this.state.profile,
            [event.target.name]: event.target.value
        }})

    handleChangeSelect = (event, index, value, name) => this.setState({
        profile: {
            ...this.state.profile,
            [name]: value
        }})

    handleChangeDate = (event, date, name) => this.setState({
        profile: {
            ...this.state.profile,
            [name]: date
        }})

    handleChangeJobFamily = (event, index, value) => {
        const jf = this.props.jobFamilies.filter((j) => j.jfCode === value)
        const divisions = jf && jf.length > 0 ? jf[0].divisions : []
        this.setState({
            profile: {
                ...this.state.profile,
                jobFamily: value
            },
            divisions
        })
    }

    handleChangeDivision = (event, index, value) => {
        const jf = this.props.jobFamilies.filter((j) => j.jfCode === this.state.profile.jobFamily)
        const divisions = jf && jf.length > 0 ? jf[0].divisions : []
        const sdiv = divisions.filter((j) => j.divCode === value)
        const subDivisions = sdiv && sdiv.length > 0 ? sdiv[0].subDivisions : []
        this.setState({
            profile: {
                ...this.state.profile,
                division: value
            },
            subDivisions
        })
    }

    onRefreshSuspendDate = () => this.setState({
        profile: {
            ...this.state.profile,
            suspendDate: null
        }})

    validateEmail () {
        let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return this.state.profile.email.match(format);
    }

    validatePhone () {
        let format = /^\+62[0-9]*$/;
        return this.state.profile.phone.match(format);
    }

    validateMandatoryField() {
        let isValid = true;
        const { profile } = this.state;
        if (profile.firstName === "" || profile.lastName === "" || profile.jobFamily === undefined
            || profile.phone === "" || profile.email === "" || !this.validateEmail() || !this.validatePhone()) {
            isValid = false;
        }

        return isValid;
    }

    handleChangeAvatar = (event) => {
        // console.log("change avatar: " + event.target.files[0].name);
        let fReader = new FileReader();
        fReader.readAsDataURL(event.target.files[0]);
        fReader.onloadend = ((e) => {
            // console.log("fReader: " + e.target.result);
            this.setState({
                profile: {
                    ...this.state.profile,
                    avatar: e.target.result
                }})
        });
    }

    onClickAvatar = (event) => {
        this.avatarInput.click();
    }

    render() {

        const {currentGrade, divisions, subDivisions} = this.state;
        const {firstName, lastName, maritalStatus, empStatus, gender, suspendDate,
            hiredDate, dob, nationality, jobFamily, division, subDivision, phone, email,
            avatar} = this.state.profile ? this.state.profile : {};

        const { jobFamilies } = this.props

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col sm={9} md={6}>
                                <TextField floatingLabelText="First Name"
                                           name="firstName"
                                           value={firstName}
                                           onChange={this.handleChangeText}
                                           errorText={!firstName && "This field is required"}
                                />
                            </Col>
                            <Col sm={9} md={6}>
                                <TextField floatingLabelText="Last Name"
                                           name="lastName"
                                           value={lastName}
                                           onChange={this.handleChangeText}
                                           errorText={!lastName && "This field is required"}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={9} md={6}>
                                <SelectField
                                    floatingLabelText="Marital Status"
                                    value={maritalStatus}
                                    onChange={(event, index, value) =>  this.handleChangeSelect(event, index, value, "maritalStatus")}
                                >
                                    {maritalStatusMap.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                </SelectField>
                            </Col>
                            <Col sm={9} md={6}>
                                <SelectField
                                    floatingLabelText="Employee Status"
                                    value={empStatus}
                                    onChange={(event, index, value) =>  this.handleChangeSelect(event, index, value, "empStatus")}
                                    errorText={!empStatus && "This field is required"}
                                >
                                    {employeeStatusMap.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                </SelectField>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={9} md={6}>
                                <SelectField
                                    floatingLabelText="Gender"
                                    value={gender}
                                    onChange={(event, index, value) =>  this.handleChangeSelect(event, index, value, "gender")}
                                    errorText={!gender && "This field is required"}
                                >
                                    {genders.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                </SelectField>
                            </Col>
                            <Col sm={9} md={6}>
                                <DatePicker
                                    floatingLabelText="Suspend Date"
                                    value={suspendDate ? new Date(suspendDate) : suspendDate}
                                    onChange={(event, date) =>  this.handleChangeDate(event, date, "suspendDate")}
                                    formatDate={(date) => moment(date).format("D MMMM YYYY")}
                                />
                                <FontIcon className="fa fa-refresh fa-1"
                                          hoverColor={pinkA200}
                                          style={{ position: "absolute", marginTop: -40, marginLeft: 250, zIndex: 2}}
                                          onClick={() => this.onRefreshSuspendDate()}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={9} md={6}>
                                <DatePicker
                                    floatingLabelText="Date of Birth"
                                    value={dob? new Date(dob) : dob}
                                    onChange={(event, date) =>  this.handleChangeDate(event, date, "dob")}
                                    formatDate={(date) => moment(date).format("ll")}
                                />
                            </Col>
                            <Col sm={9} md={6}>
                                <DatePicker
                                    floatingLabelText="Hired Date"
                                    value={hiredDate ? new Date(hiredDate) : hiredDate}
                                    onChange={(event, date) =>  this.handleChangeDate(event, date, "hiredDate")}
                                    formatDate={(date) => moment(date).format("D MMMM YYYY")}
                                    errorText={!hiredDate && "This field is required"}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={9} md={6}>
                                <TextField floatingLabelText="Nationality"
                                           name="nationality"
                                           value={nationality}
                                           onChange={this.handleChangeText}
                                />
                            </Col>
                            <Col sm={9} md={6}>
                                <TextField floatingLabelText="Grade"
                                           name="currentGrade"
                                           value={currentGrade}
                                           onChange={this.handleChangeText}
                                           disabled={true}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={9} md={6}>
                                <SelectField
                                    floatingLabelText="Job Family"
                                    value={jobFamily}
                                    onChange={this.handleChangeJobFamily}
                                    errorText={!jobFamily && "This field is required"}
                                >
                                    {jobFamilies ? jobFamilies.map((f) => <MenuItem key={f.jfCode} value={f.jfCode} primaryText={f.jobFamily} />) : ""}
                                </SelectField>
                            </Col>
                            <Col sm={9} md={6}>
                                <SelectField
                                    floatingLabelText="Division"
                                    value={division}
                                    onChange={this.handleChangeDivision}
                                >
                                    {divisions ? divisions.map((f) => <MenuItem key={f.divCode} value={f.divCode} primaryText={f.division} />) : ""}
                                </SelectField>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={9} md={6}>
                                <SelectField
                                    floatingLabelText="Sub Division"
                                    value={subDivision}
                                    onChange={(event, index, value) =>  this.handleChangeSelect(event, index, value, "subDivision")}
                                >
                                    {subDivisions ? subDivisions.map((f) => <MenuItem key={f.subDivCode} value={f.subDivCode} primaryText={f.subDivision} />) : ""}
                                </SelectField>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={9} md={6}>
                                <TextField floatingLabelText="Phone"
                                           name="phone"
                                           value={phone}
                                           onChange={this.handleChangeText}
                                           hintText="+62"
                                           errorText={(!phone && "This field is required") || (!this.validatePhone() && "Invalid Phone")}
                                />
                            </Col>
                            <Col sm={9} md={6}>
                                <TextField floatingLabelText="Email"
                                           name="email"
                                           value={email}
                                           onChange={this.handleChangeText}
                                           errorText={(!email && "This field is required") || (!this.validateEmail() && "Invalid Email")}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={6} md={4}>
                        <input id="input-file" ref={(input) => this.avatarInput = input } type="file" name="avatar" accept="image/*" onChange={(e) => this.handleChangeAvatar(e)} />
                        <Avatar src={avatar} style={avatarStyle} onTouchTap={(e) => this.onClickAvatar(e)} />
                        <FontIcon className="fa fa-camera" style={cameraPickStyle}
                                  hoverColor={pinkA200}
                                  onClick={(e) => this.onClickAvatar(e)}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ProfileForm.propTypes = {
    initialValues: React.PropTypes.object,
    currentGrade: React.PropTypes.string,
    jobFamilies: React.PropTypes.object.isRequired
};

export default ProfileForm