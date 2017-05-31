import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { sortByOptions } from '../../utils/lib/constants';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pinkA200 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';


const fabStyle = {
    float: "right",
    marginTop: -10
};

class SortForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortOptions: props.sortOptions ? props.sortOptions : [],
            addButtonDisabled: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sortOptions: nextProps.sortOptions
        });
    }

    onAddSort = () => {
        this.setState({
            sortOptions: [ ...this.state.sortOptions,
                { sortBy: "" }
            ]
        });
    }

    handleChangeSelect = (event, idx, value, index, name) => {
        const tmpSortOptions = this.state.sortOptions.map((item, i) => {
                if (i === index) {
                    return { ...item, [name]: value }
                }
                else {
                    return item;
                }
            });

        this.setState({
            sortOptions: tmpSortOptions
        });

        this.props.handleChangeSort(tmpSortOptions);
    }

    onRemoveSort = (deletedIndex) => {
        const tmpSortOptions = this.state.sortOptions.filter((item, index) => index !== deletedIndex)
        this.setState({
            sortOptions: tmpSortOptions
        });
        this.props.handleChangeSort(tmpSortOptions);
    }


    render() {

        const { sortOptions } = this.state;

        return (
            <div>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Sort By</TableHeaderColumn>
                            <TableHeaderColumn>Sort Type</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {sortOptions.map((item, index) => (
                            <TableRow key={index} selectable={false} displayBorder={false}>
                                <TableRowColumn>
                                    <SelectField
                                        value={item.sortBy}
                                        onChange={(event, idx, value) =>  this.handleChangeSelect(event, idx, value, index, "sortBy")}
                                    >
                                        {sortByOptions.map((f) => <MenuItem key={f.value} value={f.value} primaryText={f.text} />)}
                                    </SelectField>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <SelectField
                                        value={item.sortType}
                                        onChange={(event, idx, value) =>  this.handleChangeSelect(event, idx, value, index, "sortType")}
                                    >
                                        <MenuItem value="asc" primaryText="Ascending" />
                                        <MenuItem value="desc" primaryText="Descending" />
                                    </SelectField>
                                    <FontIcon className="fa fa-trash fa-1"
                                              hoverColor={pinkA200}
                                              style={{ position: "absolute", marginLeft: -70, zIndex: 2}}
                                              onClick={() => this.onRemoveSort(index)}
                                    />
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <FloatingActionButton mini={true} style={fabStyle}>
                    <ContentAdd  onClick={() => this.onAddSort()} />
                </FloatingActionButton>
            </div>
        );
    }
}

export default SortForm;