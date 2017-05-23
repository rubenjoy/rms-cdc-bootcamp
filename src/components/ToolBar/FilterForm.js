import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { genders, employeeStatusMap, maritalStatusMap } from '../../utils/lib/constants';
import { Grid, Row, Col } from 'react-bootstrap';
import { pinkA200 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

import './filter.css';

const defaultFilter = {
    jobFamily: {checked: false},
    grade: {checked: false},
    division: {checked: false},
    location: {checked: false},
    gender: {checked: false},
    isActive: {checked: false},
    empStatus: {checked: false},
    maritalStatus: {checked: false}
};

class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterOptions: props.filterOptions ? props.filterOptions : defaultFilter ,
            filters: props.filters ? { ...props.filters } : {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filters: nextProps.filters,
            filterOptions: nextProps.filterOptions
        });
    }

    handleResetFilter = () => {
        this.setState({
            filterOptions: defaultFilter,
            filters: {}
        });
    }

    handleChangeChecked = (event, name) => {

        let newFilters = this.state.filters;
        if (!event.target.checked) {
            delete newFilters[name];
        }

        this.setState({
            filterOptions: {
                ...this.state.filterOptions,
                [name]: {
                    ...this.state.filterOptions[name],
                    checked: event.target.checked
                }
            },
            filters: newFilters
        });
    }

    handleChangeCheckedForJobFamily = (event, name) => {
        let newFilters = this.state.filters;
        if (!event.target.checked) {
            delete newFilters[name];
        }

        this.setState({
            filterOptions: {
                ...this.state.filterOptions,
                [name]: {
                    ...this.state.filterOptions[name],
                    checked: event.target.checked
                },
                jobFamily: {
                    ...this.state.filterOptions.jobFamily,
                    checked: true
                }
            },
            filters: newFilters
        });
    }

    handleChangeJobFamily = (event, index, value) => {
        const jf = this.props.jobFamilies.filter((j) => j.jfCode === value)[0];
        let gradeOptions = [];
        if (jf.jfLevels) {
            jf.jfLevels.map((i) => gradeOptions.push({text: i.grade, value: i.grade}));
        }

        let divOptions = [];
        if (jf.divisions) {
            jf.divisions.map((i) => divOptions.push({text: i.division, value: i.divCode}));
        }

        this.setState({
            filterOptions: {
                ...this.state.filterOptions,
                grade: {
                    ...this.state.filterOptions.grade,
                    options: gradeOptions
                },
                division: {
                    ...this.state.filterOptions.division,
                    options: divOptions
                },
                jobFamily: {
                    ...this.state.filterOptions.jobFamily,
                    value
                }
            }
        });

    }

    handleChangeFilter = (event, index, value, name) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [name]: value
            }
        });
        //should update state
        this.props.handleChangeFilter({...this.state.filters,
                [name]: value});
    }

    render() {
        const { filterOptions, filters } = this.state;
        const { jobFamilies, officeAddresses } = this.props;
        const { jobFamily, grade, division, location, gender, isActive, empStatus, maritalStatus } = filterOptions;

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={9} md={6}>
                        <div className="filter-row">
                            <div className="filter-check">
                                <input type="checkbox"
                                       name="active"
                                       value={jobFamily.checked}
                                       checked={jobFamily.checked}
                                       disabled={true}
                                />
                            </div>
                            <div className="filter-select">
                                <SelectField
                                    floatingLabelText="Job Family"
                                    value={jobFamily.value}
                                    onChange={this.handleChangeJobFamily}
                                    disabled={!jobFamily.checked}
                                >
                                    {jobFamilies ? jobFamilies.map((f) => <MenuItem key={f.jfCode} value={f.jfCode} primaryText={f.jobFamily} />) : ""}
                                </SelectField>
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter-check">
                                <input type="checkbox"
                                       name="active"
                                       value={grade.checked}
                                       checked={grade.checked}
                                       onChange={(event) => this.handleChangeCheckedForJobFamily(event, "grade")}
                                />
                            </div>
                            <div className="filter-select">
                                <SelectField
                                    floatingLabelText="Grade"
                                    value={filters.grade}
                                    onChange={(event, index, value) => this.handleChangeFilter(event, index, value, "grade")}
                                    disabled={!grade.checked}
                                >
                                    {grade.options ? grade.options.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />) : ""}
                                </SelectField>
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter-check">
                                <input type="checkbox"
                                       name="active"
                                       value={division.checked}
                                       checked={division.checked}
                                       onChange={(event) => this.handleChangeCheckedForJobFamily(event, "division")}
                                />
                            </div>
                            <div className="filter-select">
                                <SelectField
                                    floatingLabelText="Division"
                                    value={filters.division}
                                    onChange={(event, index, value) => this.handleChangeFilter(event, index, value, "division")}
                                    disabled={!division.checked}
                                >
                                    {division.options ? division.options.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />) : ""}
                                </SelectField>
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter-check">
                                <input type="checkbox"
                                       name="active"
                                       value={location.checked}
                                       checked={location.checked}
                                       onChange={(event) => this.handleChangeChecked(event, "location")}
                                />
                            </div>
                            <div className="filter-select">
                                <SelectField
                                    floatingLabelText="Location"
                                    value={filters.location}
                                    onChange={(event, index, value) => this.handleChangeFilter(event, index, value, "location")}
                                    disabled={!location.checked}
                                >
                                    {officeAddresses.length > 0 ? officeAddresses.map((l) => <MenuItem key={l.addressId} value={l.addressId} primaryText={l.addressId} />) : ""}
                                </SelectField>
                            </div>
                        </div>
                    </Col>
                    <Col sm={9} md={6}>
                        <FontIcon className="fa fa-trash fa-1"
                                  hoverColor={pinkA200}
                                  style={{ position: "absolute", marginLeft: 300, marginTop: 20, zIndex: 2}}
                                  onClick={() => this.handleResetFilter()}
                        />
                        <div className="filter-row">
                            <div className="filter-check">
                                <input type="checkbox"
                                       name="active"
                                       value={gender.checked}
                                       checked={gender.checked}
                                       onChange={(event) => this.handleChangeChecked(event, "gender")}
                                />
                            </div>
                            <div className="filter-select">
                                <SelectField
                                    floatingLabelText="Gender"
                                    value={filters.gender}
                                    onChange={(event, index, value) => this.handleChangeFilter(event, index, value, "gender")}
                                    disabled={!gender.checked}
                                >
                                    {genders.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                </SelectField>
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter-check">
                                <input type="checkbox"
                                       name="active"
                                       value={isActive.checked}
                                       checked={isActive.checked}
                                       onChange={(event) => this.handleChangeChecked(event, "isActive")}
                                />
                            </div>
                            <div className="filter-select">
                                <SelectField
                                    floatingLabelText="Active Employee"
                                    value={filters.isActive}
                                    onChange={(event, index, value) => this.handleChangeFilter(event, index, value, "isActive")}
                                    disabled={!isActive.checked}
                                >
                                    <MenuItem value={true} primaryText="Active" />
                                    <MenuItem value={false} primaryText="Inactive" />
                                </SelectField>
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter-check">
                                <input type="checkbox"
                                       name="active"
                                       value={empStatus.checked}
                                       checked={empStatus.checked}
                                       onChange={(event) => this.handleChangeChecked(event, "empStatus")}
                                />
                            </div>
                            <div className="filter-select">
                                <SelectField
                                    floatingLabelText="Employment Status"
                                    value={filters.empStatus}
                                    onChange={(event, index, value) => this.handleChangeFilter(event, index, value, "empStatus")}
                                    disabled={!empStatus.checked}
                                >
                                    {employeeStatusMap.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                </SelectField>
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter-check">
                                <input type="checkbox"
                                       name="active"
                                       value={maritalStatus.checked}
                                       checked={maritalStatus.checked}
                                       onChange={(event) => this.handleChangeChecked(event, "maritalStatus")}
                                />
                            </div>
                            <div className="filter-select">
                                <SelectField
                                    floatingLabelText="Marital Status"
                                    value={filters.maritalStatus}
                                    onChange={(event, index, value) => this.handleChangeFilter(event, index, value, "maritalStatus")}
                                    disabled={!maritalStatus.checked}
                                >
                                    {maritalStatusMap.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                </SelectField>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default FilterForm;