import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

const RESET_VALUES = {
    id: '',
    category: '',
    description: '',
    title: ''
};

export default class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            product: Object.assign({}, RESET_VALUES),
            errors: { title: '' , description:'', category:''},
            titleVaild: false
        };
    }

    handleSave(e) {
        this.props.onSave(this.state.product);
        // reset the form values to blank after submitting:
        this.setState({
            product: Object.assign({}, RESET_VALUES),
            errors: {}
        });
        // prevent the form submit event from triggering an HTTP Post:
        e.preventDefault();
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState) => {
            prevState.product[name] = value;
            return { product: prevState.product };
        });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <Route exact path="/NewTicket" render={props => (
                        <React.Fragment>
                            <form>
                                <h3>Submit a new ticket request</h3>
                                <p>
                                    <label>
                                        Title
                        <br />
                                        <input
                                            type="text"
                                            name="title"
                                            onChange={this.handleChange}
                                            value={this.state.product.name}
                                            required="required"
                                        />
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        Category
                        <br />
                                        <input
                                            type="text"
                                            name="category"
                                            onChange={this.handleChange}
                                            value={this.state.product.category}
                                            required="required"
                                        />
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        Description
                        <br />
                                        <input style={boxStyle}
                                            type="text"
                                            name="description"
                                            onChange={this.handleChange}
                                            value={this.state.product.description}
                                            required="required"
                                        />
                                    </label>
                                </p>
                                <input
                                    type="submit"
                                    value="Save"
                                    //onClick={this.handleSave}
                                />
                            </form>
                        </React.Fragment>
                    )} />
                </div>
            </div>

        );
    }
}

const boxStyle = {
	textAlign: 'center',
    padding: '10px',
    width: '200px',
    height: '20px',
    
}