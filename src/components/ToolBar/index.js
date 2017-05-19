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
            sortOpen: false
        }

        this.filterForm = null;
        this.sortForm = null;
    }

    render() {

        const { filterOpen, sortOpen } = this.state;

        const filterActions = [
            <FlatButton
                label="Cancel" 
            />,
            <FlatButton
                label="Filter"
                secondary={true}
            />,
        ];

        const sortActions = [
            <FlatButton
                label="Cancel" 
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
                        />
                        <FontIcon className="fa fa-sort-amount-desc" 
                                    color={white}
                        />                    
                        <IconButton tooltip={this.state.filterByCriteria? "Filter On":"Filter Off"} 
                            className="panel-list-btn">
                            <ContentFilterList color={white} />
                        </IconButton>
                        <IconButton tooltip="Order" className="panel-list-btn" >
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

export default Toolbars;