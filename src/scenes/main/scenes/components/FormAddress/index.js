import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css' ;

const buttonStyle = {
    float: "right",
    marginRight: 10,
    marginTop: 5
}

class FormAddress extends Component {

    constructor(props) {
        super(props);

        this.state = {
            address: {}
        }

        this.setStateWithPropsInitialValue(props.initialValues);

    }

    setStateWithPropsInitialValue = (initialValues) => {
        if (initialValues) {

            this.state = {
                address: {
                    streetAddress: initialValues.streetAddress ? initialValues.streetAddress : "",
                    city: initialValues.city ? initialValues.city : "",
                    province: initialValues.province ? initialValues.province : "",
                    postCode: initialValues.postCode ? initialValues.postCode : "",
                }
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setStateWithPropsInitialValue(nextProps.initialValues);
    }

    onSave() {
        this.props.onSave(this.state.address);
    }

    onCancel() {
        if (confirm("Are you sure to discard changes?")) {
            if (this.props.initialValues)
            {
                // console.log("initialValues: " + JSON.stringify(this.props.initialValues));
                const { initialValues } = this.props;
                this.setState({
                    address: {
                        streetAddress: initialValues.streetAddress ? initialValues.streetAddress : "",
                        city: initialValues.city ? initialValues.city : "",
                        province: initialValues.province ? initialValues.province : "",
                        postCode: initialValues.postCode ? initialValues.postCode : "",
                    }
                });
            }
        }
    }

    handleChangeText = (event) => this.setState({
        address: {
            ...this.state.address,
            [event.target.name]: event.target.value
        }})

    render() {

        const { streetAddress, city, province, postCode } = this.state.address;

        return (
            <div className="tab-address">
                <div id="address-form">
                    <TextField floatingLabelText="Address"
                               name="streetAddress"
                               value={streetAddress}
                               multiLine={true}
                               rows={3}
                               onChange={this.handleChangeText}
                    /> <br />
                    <TextField floatingLabelText="City"
                               name="city"
                               value={city}
                               onChange={this.handleChangeText}
                    /> <br />
                    <TextField floatingLabelText="Province"
                               name="province"
                               value={province}
                               onChange={this.handleChangeText}
                    /> <br />
                    <TextField floatingLabelText="Postcode"
                               type="number"
                               name="postCode"
                               value={postCode}
                               onChange={this.handleChangeText}
                    />
                </div>

                <div className="row" id="bottom-bar">
                    <RaisedButton label="Save" secondary={true} style={buttonStyle} onClick={() => this.onSave()} />
                    <RaisedButton label="Cancel" style={buttonStyle} onClick={() => this.onCancel()}  />
                </div>
            </div>
        );
    }
}

FormAddress.propTypes = {
    onSave: React.PropTypes.func,
    initialValues: React.PropTypes.object
};

export default FormAddress;