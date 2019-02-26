import React from "react";
import PropTypes from 'prop-types';
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            ticket: Object.assign({}, RESET_VALUES),
            errors: { title: '', description: '', category: '' },
        };
    }

    handleSubmit(e) {
        console.log('clicked submit');
        
        if (this.handleValidation()) {
            alert("Ticket submitted");
            this.setState({
                ticket: Object.assign({}, RESET_VALUES),
            });
        }else{
            alert("There are some errors now. Try again later.");
        }
        // prevent the form submit event from triggering an HTTP Post:
        //e.preventDefault();
        //this.props.addTicket(this.state.ticket);
        // reset the form values to blank after submitting:

    }

    handleValidation(e) {
        let products = this.state.products;
        let validTicket = true;
        if (products.title === '') {
            validTicket = false;
            console.log('No title');
        }
        if (products.category === '') {
            validTicket = false;
            console.log('No category');
        }
        if (products.description === '') {
            validTicket = false;
            console.log('description');
        }
        return validTicket;
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => {
            prevState.ticket[name] = value;
            return { ticket: prevState.ticket };
        });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <Route exact path="/NewTicket" render={props => (
                        <React.Fragment>
                            <form name="ticketForm" onSubmit={this.handleSubmit}>
                                <h3>Submit a new ticket request</h3>
                                <p>
                                    <label>
                                        Title
                                        <br />
                                        <input
                                            type="text"
                                            name="title"
                                            onChange={this.handleChange}
                                            value={this.state.ticket.name}
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
                                            value={this.state.ticket.category}
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
                                            value={this.state.ticket.description}
                                            required="required"
                                        />
                                    </label>
                                </p>
                                <input
                                    type="submit"
                                    value="Save"
                                    onClick={this.handleSubmit}
                                />
                            </form>
                        </React.Fragment>
                    )} />
                </div>
            </div>

        );
    }
}

// // PropTypes
// NewTicket.propTypes = {
// 	addTicket: PropTypes.func.isRequired
// }

const boxStyle = {
    textAlign: 'center',
    padding: '10px',
    width: '200px',
    height: '20px',

}