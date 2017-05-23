import React, {Component} from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import AVPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FilterForm from './FilterForm';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RMSAction from '../../data/employees/actionCreators';

import {
    white
} from 'material-ui/styles/colors';

const toolbarStyles = {
    backgroundColor: "#5c6bc0",
    height: 48
}

const searchTextStyles = {
    color: "white"
}

class Toolbars extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterOpen: false,
            sortOpen: false,
            textSearch: ""
        }
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.payload = {};
    }

    handleSortOpen(){
        this.setState({sortOpen: true});
    }

    handleSortClose(){
        this.setState({sortOpen: false});
    }

    handleFilterOpen() {
        this.setState({filterOpen: true})
    }

    handleFilterClose() {
        this.setState({filterOpen: false})
    }

    handleTextSearchChange = (event) => {
        this.setState({textSearch: event.target.value});
        if(event.keyCode === 13) {
            this.props.actions.refreshEmployeeList('name', event.target.value);
        }
    }

    handleChangeFilter (filters) {
        this.payload = filters;
    }

    requestFilter = () => {
        this.props.actions.refreshEmployeeList('filter', this.payload);
        this.setState({filterOpen: false});
    }

    render() {

        const { filterOpen, sortOpen } = this.state;
        const { jobFamilies, offices } = this.props;

        const filterActions = [
            <FlatButton
                label="Cancel" 
                onClick={()=> this.handleFilterClose()}
            />,
            <FlatButton
                label="Filter"
                secondary={true}
                onClick={()=>this.requestFilter()}
            />,
        ];

        const sortActions = [
            <FlatButton
                label="Cancel" 
                onClick={()=> this.handleSortClose()}
            />,
            <FlatButton
                label="Sort"
                secondary={true}
            />,
        ];

        return (
            <div>
                <Toolbar style={toolbarStyles}>
                    <ToolbarGroup>

                        <IconButton>
                            <ActionSearch color={white} />
                        </IconButton>

                        <TextField fullWidth={true}
                                   className="search-text"
                                   hintText="Search"
                                   underlineShow={false}
                                   hintStyle={searchTextStyles}
                                   inputStyle={searchTextStyles}
                                   onChange={(event) => this.handleTextSearchChange(event)}
                                   onKeyDown={(event) => this.handleTextSearchChange(event)}
                        />
                        <FontIcon className="fa fa-sort-amount-desc" 
                                    color={white}
                        />                    
                        <IconButton tooltip={this.state.filterByCriteria? "Filter On":"Filter Off"} 
                            onClick={()=>this.handleFilterOpen()}
                            className="panel-list-btn">
                            <ContentFilterList color={white} />
                        </IconButton>
                        <IconButton tooltip="Order" className="panel-list-btn" onClick={()=>{this.handleSortOpen()}} >
                            <AVPlaylistAddCheck color={white} />
                        </IconButton>
                        <Chip></Chip>
                    </ToolbarGroup>
                </Toolbar>

                <Dialog
                    title="Filter"
                    modal={true}
                    open={filterOpen}
                    actions={filterActions}
                    contentStyle={{ width: "80%"}}
                >
                    <FilterForm jobFamilies={jobFamilies}
                                offices={offices ? offices : []}
                                officeAddresses={offices}
                                handleChangeFilter={this.handleChangeFilter}
                    />

                </Dialog>

                <Dialog
                    title="Sort"
                    modal={true}
                    open={sortOpen}
                    actions={sortActions}
                    contentStyle={{ width: "50%"}}
                >
                </Dialog>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        jobFamilies: state.employees.jobFamilies,
        offices: state.employees.offices
    };
}

const mapDispatchToProps = (dispatch) => (
    {actions: bindActionCreators(RMSAction, dispatch)}
)

export default connect(mapStateToProps, mapDispatchToProps)(Toolbars);