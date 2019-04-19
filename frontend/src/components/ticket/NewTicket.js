import React from "react";
//import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import constants from "../../resources/strings.js";
import CATEGORY_VALUES from "../../resources/CategoryConst";
import { Button, Grid, MenuItem, TextField, Typography } from '@material-ui/core';

const RESET_VALUES = {
    category: '',
    message: '',
    title: '',
    email: '',
    status: 'Open'
};

const RESET_VALUES_ERROR = { title: '', message: '', category: '', email: '' };

export default class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.emailMaxChars = 320;
        this.titleMaxChars = 100;
        this.maxMessageChars = 1000;
        this.state = {
            ticket: Object.assign({}, RESET_VALUES),
            errorText: (Object.assign({}, RESET_VALUES_ERROR)),
            user: props.myState.userProfile.registerCallback(this).value,
            // this.userProfile = props.myState.userProfile.registerCallback(this);
            wordCount: 0,
            messageCharsLeft: this.maxMessageChars,
            // catList: [],
            waiting: false,
        };
        this.isAdmin = props.isAdmin;
        this.numberOfTickets = this.state.user.numberOfTickets;
        console.log(this.state.user);
        // $(window).on('load', function () {
        //     $("#loadingscreen").hide();
        // });
    }

    // returns the date and time the reply was posted in UTC
    getDateCreated() {
        var today = new Date();
        // console.log(today);
        return today.toUTCString();
    }

    addTicket(e) {

        let data = {
            title: e.title,
            category: e.category,
            replies: [
                {
                    name: this.state.user.username,
                    // name: "User1",
                    message: e.message,
                    date: this.getDateCreated()
                }

            ],
            status: 'Open',
            email: e.email,
            replyCount: 1,
            ACL: {
                "*": {
                    "read": false
                },
                [this.state.user.objectId]: {
                    "read": true,
                    "write": true

                },
                "role:admin": {
                    "read": true,
                    "write": true
                }
            }
        }
        console.log(data);

        fetch('https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Server-Token": constants.serverToken,
                    "cache-control": "no-cache",
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

    }

    changeField(field, param) {
        if (typeof param === 'string') { param = "\"" + param + "\""; }
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users/" + this.state.user.objectId,
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Server-Token": constants.serverToken,
                "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": "{  \n\t\"" + field + "\":" + param + "\n}"
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

    displayLoadingScreen(e) {
        this.setState((prevState) => ({ waiting: e }));
        console.log(this.state.waiting);
        $("#summit_button").click(function () {
            // Animate loader on screen
            // $("#loadingscreen").show();
        });
        return;
    }

    checkSpam(e) {
        let ticketLimit = 3;
        //check ticket limit
        var now = new Date(new Date().toUTCString()); //current date/time 
        var lastTicketDate = new Date(this.state.user.lastTicket); //date/time of last posted ticket
        //var nextDay = (now.getDay() !== lastTicketDate.getDay() && now.getTime() > lastTicketDate.getTime()); //check if current day > last posted day
        var checkYear = now.getYear() > lastTicketDate.getYear();
        var checkMonth = now.getMonth() > lastTicketDate.getMonth();
        var checkDate = now.getDate() > lastTicketDate.getDate();
        var nextDay = checkYear || checkMonth || checkDate;
        if (this.isAdmin) {
            return true;
        }
        // var nextDay = +now > +lastTicketDate;
        // if (this.state.user.numberOfTickets < ticketLimit || nextDay) {
        if ((this.numberOfTickets < ticketLimit || nextDay) && e.message.length <= this.maxMessageChars) {
            // reset numberOfTickets if nextDay, and increment by 1
            if (nextDay) {
                this.numberOfTickets = 1;
                this.changeField("numberOfTickets", this.numberOfTickets);
            } else {
                this.numberOfTickets = this.numberOfTickets + 1
                console.log(this.numberOfTickets);
                this.changeField("numberOfTickets", this.numberOfTickets);
            }
            return true;
        } 
        else if (e.message.length > this.maxMessageChars) {
            alert("Message character count is too high, please shorten your message.");
        }
        else {
            // lastTicketDate.setHours(23);
            // lastTicketDate.setMinutes(59);
            // lastTicketDate.setSeconds(59);
            // var hoursLeft = (lastTicketDate.getTime() - now.getTime())/3600000;
            // if (hoursLeft < 1) {
            //     var ans = Math.abs(Math.round(hoursLeft * 60));
            //     alert("Exceeded daily ticket limit, please try again in " + ans + " minutes.");
            // } else {
            //     var ans = Math.abs(Math.round(hoursLeft));
            //     alert("Exceeded daily ticket limit, please try again in " + ans + " hour(s).");
            // }
            alert("Exceeded daily ticket limit, please try again tomorrow.");
            return false;
        }
    }

    handleSubmit(e) {
        console.log('clicked submit');
        // this.displayLoadingScreen(true);
        // console.log(this.state.waiting);
        let ticketValid = this.handleValidation(e);
        let notSpam = this.checkSpam(e);
        // console.log('finish checking');
        // this.displayLoadingScreen(false);
        if (ticketValid && notSpam) {
            console.log(JSON.stringify(e));
            this.addTicket(e);
            alert("Ticket has been created.")
            this.setState({
                lastTicket: this.getDateCreated()
            })
            this.changeField("lastTicket", this.state.user.lastTicket); //updating user lastTicket field

            //send notification
            this.sendNotif(e);

            window.location.replace("/");
            // window.location.herf = '/';
            // this.props.history.push('/');
            // reset the form values to blank after submitting:
            this.setState({
                ticket: Object.assign({}, RESET_VALUES),
            });
            return;
            // this.props.history.push('/');
            //return <Redirect to='/' push={true}></Redirect>;
            
        }
        else if (notSpam){
            alert("Please fill in all the required fills.");
            return;
        }
        // prevent the form submit event from triggering an HTTP Post:
        // e.preventDefault();
    }

    handleValidation(e) {

        let ticket = e;
        var errorTextCopy = Object.assign({}, this.state.errorText);
        var count = 0;
        if (ticket.title === '') {
            console.log('No title');
            errorTextCopy.title = 'Please fill in a title';
            count += 1;
        }
        else {
            errorTextCopy.title = '';
        }

        if (ticket.category === '') {
            console.log('No category');
            errorTextCopy.category = 'Please fill in a category';
            count += 1;
        }
        else {
            errorTextCopy.category = '';
        }

        if (ticket.message === '') {
            console.log('No message');
            errorTextCopy.message = 'Please fill in a message';
            count += 1;
        }
        else {
            errorTextCopy.message = '';
            /*
            var relevant = this.checkMessageRevelance(ticket.message);
            console.log("what is the relevance value" + relevant);
            if (relevant) {
                errorTextCopy.message = '';
            }
            else {
                errorTextCopy.message = 'Please add more relevant details of your problem.';
                count += 1;
                // alert("Please add more relevant details of your problem.");
            }
            */
        }

        if (ticket.email === '') {
            console.log('No email');
            errorTextCopy.email = 'Please fill in a email';
            count += 1;
        }
        else {
            errorTextCopy.email = '';
        }
        

        this.setState({ errorText: errorTextCopy });
        // console.log("count is " + count);

        if (count === 0) {
            this.setState({ errorText: Object.assign({}, RESET_VALUES_ERROR) });
            return true;
        }
        else {
            return false;
        }
    }

    checkEmail(e) {
        // var re = /\S+@\S+\.\S+/;
        var re = /^(([^<>()\[\]\\.,;*:\s@"]+(\.[^<>()\[\]\\.,;:*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    }

    removeDiacritics(str) {
        /*
        var defaultDiacriticsRemovalMap = [
            { 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u1EA6\u1EA4\u1EAA\u1EA8\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u01DE\u1EA2\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
            { 'base': '', 'letters': /[\uA732]/g },
            { 'base': '', 'letters': /[\u01FC\u01E2]/g },
            { 'base': '', 'letters': /[\uA734]/g },
            { 'base': '', 'letters': /[\uA736]/g },
            { 'base': '', 'letters': /[\uA738\uA73A]/g },
            { 'base': '', 'letters': /[\uA73C]/g },
            { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
            { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u1E08\u0187\u023B\uA73E]/g },
            { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
            { 'base': '', 'letters': /[\u01F1\u01C4]/g },
            { 'base': '', 'letters': /[\u01F2\u01C5]/g },
            { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
            { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
            { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
            { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
            { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u0128\u012A\u012C\u0130\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
            { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
            { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
            { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
            { 'base': '', 'letters': /[\u01C7]/g },
            { 'base': '', 'letters': /[\u01C8]/g },
            { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
            { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
            { 'base': '', 'letters': /[\u01CA]/g },
            { 'base': '', 'letters': /[\u01CB]/g },
            { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u1ED2\u1ED0\u1ED6\u1ED4\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u01FE\u0186\u019F\uA74A\uA74C]/g },
            { 'base': '', 'letters': /[\u01A2]/g },
            { 'base': '', 'letters': /[\uA74E]/g },
            { 'base': '', 'letters': /[\u0222]/g },
            { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
            { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
            { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
            { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
            { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
            { 'base': '', 'letters': /[\uA728]/g },
            { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u0168\u1E78\u016A\u1E7A\u016C\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
            { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
            { 'base': '', 'letters': /[\uA760]/g },
            { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
            { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
            { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
            { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
            { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u1EA7\u1EA5\u1EAB\u1EA9\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u01DF\u1EA3\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
            { 'base': '', 'letters': /[\uA733]/g },
            { 'base': '', 'letters': /[\u00E6\u01FD\u01E3]/g },
            { 'base': '', 'letters': /[\uA735]/g },
            { 'base': '', 'letters': /[\uA737]/g },
            { 'base': '', 'letters': /[\uA739\uA73B]/g },
            { 'base': '', 'letters': /[\uA73D]/g },
            { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
            { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u0188\u023C\uA73F\u2184]/g },
            { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
            { 'base': '', 'letters': /[\u01F3\u01C6]/g },
            { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
            { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
            { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
            { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
            { 'base': '', 'letters': /[\u0195]/g },
            { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u0129\u012B\u012D\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
            { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
            { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
            { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g },
            { 'base': '', 'letters': /[\u01C9]/g },
            { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
            { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g },
            { 'base': '', 'letters': /[\u01CC]/g },
            { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u1ED3\u1ED1\u1ED7\u1ED5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u01FF\u0254\uA74B\uA74D\u0275]/g },
            { 'base': '', 'letters': /[\u01A3]/g },
            { 'base': '', 'letters': /[\u0223]/g },
            { 'base': '', 'letters': /[\uA74F]/g },
            { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
            { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
            { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g },
            { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g },
            { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g },
            { 'base': '', 'letters': /[\uA729]/g },
            { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u0169\u1E79\u016B\u1E7B\u016D\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
            { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
            { 'base': '', 'letters': /[\uA761]/g },
            { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
            { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
            { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u0177\u1EF9\u0233\u1E8F\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g },
            { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g },
            { 'base': '', 'letters': /[\u00A1\u00BF\u00C0\u00C1\u00C2\u00C3\u00C4\u00C5\u00C6\u00C7\u00C8\u00C9\u00CA\u00CB\u00CC\u00CD\u00CE\u00CF\u00D1\u00D2\u00D3\u00D4\u00D5\u00D6\u00D8\u00D9\u00DA\u00DB\u00DC\u00DD\u00DE\u00DF\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5\u00E6\u00E7\u00E9\u00EA\u00EB\u00EC\u00ED\u00EE\u00EF\u00F1\u00F2\u00F3\u00F4\u00F5\u00F6\u00F8\u00F9\u00FA\u00FB\u00FC\u00FD\u00FE\u00FF]/g }
        ];

        for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
            str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
        }

        return str;
        */
    }

    translate(e) {
        /*
        var body = [{ "Text": e }];
        // for return statement
        var translated = null;

        // API call
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var settings = {
            "async": false,
            "crossDomain": true,
            "url": proxyurl + "https://ug-api.acnapiv3.io/swivel/microsoft-translator-text/translate?api-version=3.0&from=en&to=es",
            "method": "POST",
            "headers": {
                "Server-Token": constants.serverToken,
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": JSON.stringify(body),
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            // console.log(response[0].translations[0].text);
            translated = response[0].translations[0].text;
        });

        return translated;
        */
    }

    checkMessageRevelance(e) {
        /*
        // console.log("I am in checking messages and this is my message" + e);
        var translated = this.translate(e);
        console.log(translated);
        var cleanedLetters = this.removeDiacritics(translated);
        console.log(cleanedLetters);
        var numWords = cleanedLetters.split(' ').length
        this.setState({
            wordCount: numWords
        });
        // console.log(e.split(' ').length);
        console.log(this.state.wordCount);
        if (numWords < 5) {
            return false;
        }

        // const customURL = "https://ug-api.acnapiv3.io/swivel/text-classification/class-1.1?of=json&txt=" + e + "&model=IPTC_en";

        const customURL = "https://ug-api.acnapiv3.io/swivel/text-classification/class-1.1?of=json&txt=" + cleanedLetters + "&model=BusinessRep_es";
        // console.log(customURL);

        var catList;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        var settings = {
            "async": false,
            "crossDomain": true,
            // "url": "https://ug-api.acnapiv3.io/swivel/text-classification/class-1.1?of=json&txt=I need help withmy interet. so they keep saying I am not connected to the internet but i am. I only happens for internet explore not edge not crome or firefox. Why is that so? hahaahahaha you what the problem now. I have no problem. blah blah blah. ===&model=SocialMedia_en",
            "url": proxyurl + customURL,
            "method": "POST",
            "headers": {
                "Server-Token": constants.serverToken,
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": ""
        }

        $.ajax(settings)
            .done(function (response) {
                console.log(response);
                // console.log(response.category_list);
                // console.log(response.category_list.type);
                // this.setState({ catList: response.category_list });
                catList = response.category_list;
            })

        // console.log("this is this response: " + catList);
        console.log(catList);

        // checking if content is relevant
        var relevance = false;
        /*
        var confidence = 0.0;
        catList.map(cat => {
            confidence += Number(cat.abs_relevance);
            // this is for IPTC
            // if (cat.code.startsWith("010") || cat.code.startsWith("040") || cat.code.startsWith("130")  )  {
            //     confidence += Number(cat.abs_relevance);
            //     console.log(cat.abs_relevance);
            //     // if(parseInt(cat.abs_relevance) > 0.4){
            //     //     relevance = true;
            //     // }
            // }


            // if (cat.code.startsWith("01") || cat.code.startsWith("04") || cat.code.startsWith("09") || cat.code.startsWith("14")) {
            //     confidence += Number(cat.abs_relevance);
            //     console.log(cat.abs_relevance);
            //     // if(parseInt(cat.abs_relevance) > 0.4){
            //     //     relevance = true;
            //     // }
            //     return;
            // }
        });
        console.log(confidence);
        
        if (parseInt(catList.length) > 0) {
            relevance = true;
        }

        return relevance;
        */
    }

    handleChange(e) {
        var errorTextCopy = Object.assign({}, this.state.errorText);

        const target = e.target;
        var value = target.value;
        const name = target.name;
        
        if (name === 'title'){
            if (value.length > this.titleMaxChars) {
                errorTextCopy.title = 'Please shorten your title';
            }
            else{
                errorTextCopy.title = '';
            }
        }

        if (name === 'email') {
            var validEmail = this.checkEmail(value);
            if (validEmail) {
                errorTextCopy.email = '';
            }
            // else if (value.length > this.emailMaxChars) {
            //     errorTextCopy.email = 'Email is too long';
            // }
            else {
                errorTextCopy.email = 'Please enter valid email';
            }
        }

        if (name === 'message') {
            this.setState({
                messageCharsLeft: this.maxMessageChars - value.length,
            });
        }
        
        this.setState((prevState) => {
            prevState.ticket[name] = value;
            return { ticket: prevState.ticket, errorText: errorTextCopy };
        });
    }

    sendNotif(e) {
        let emailBody = {
            "subject": "Ticket submission",
            "sender": "Accenture@do-not-reply.com",
            "recipient": e.email,
            "html": "<p>Hello " + this.state.user.username + ",</p><p>Your submission has been received. Please be patient as an administrator will reply to your ticket shortly.</p><p>-Ticket details-<br />Title: " + e.title + "<br />Category: " + e.category + "<br />Date/time of submission: " + this.getDateCreated() + "<br />Message: " + e.message
        }
        console.log(emailBody);
        console.log(JSON.stringify(emailBody));

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Server-Token": constants.serverToken,
                    "cache-control": "no-cache"
                },
                body: JSON.stringify(emailBody)
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }


    render() {
        // $(window).on('load', function () {
        //     $("#loadingscreen").hide();
        // });
        return (
            <Route exact path="/NewTicket" render={props => (
                <React.Fragment>
                    <h3 align="center">Submit a new ticket request</h3>
                    <form
                        style={{ paddingLeft: 20, marginTop: "1%", paddingRight: 20 }}
                    >
                        <Grid
                            container direction="column" justify="space-between" spacing={16}
                        >
                            <Typography
                                align="left" variant="h6"
                            >
                                Title
                                        </Typography>
                                    <TextField
                                        // label="Title"
                                        name="title"
                                        multiline
                                        rowsMax="2"
                                        type='text'
                                        value={this.state.ticket.name}
                                        onChange={this.handleChange}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        placeholder="Title"
                                        InputLabelProps={{ shrink: true, }}
                                        required={true}
                                        error={((
                                            (this.state.errorText.title !== '' && this.state.ticket.title === '') ||
                                            (this.state.ticket.title.length > this.titleMaxChars)
                                            ) ? true : false)}
                                        helperText={this.state.errorText.title}
                                    >
                                    </TextField>
                                    <Typography
                                        align="left" variant="h6"
                                    >
                                        Category
                                        </Typography>
                            <TextField
                                name="category"
                                select
                                value={this.state.ticket.category}
                                onChange={this.handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputProps={{ style: { textAlign: "Left" } }}
                                InputLabelProps={{ shrink: true, }}
                                required={true}
                                error={((this.state.errorText.category !== '' && this.state.ticket.category === '') ? true : false)}
                                helperText={this.state.errorText.category}
                            >
                                {CATEGORY_VALUES.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Typography
                                align="left" variant="h6"
                            >
                                Message
                                        </Typography>
                                    <TextField
                                        name="message"
                                        multiline
                                        value={this.state.ticket.message}
                                        onChange={this.handleChange}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        placeholder="Message"
                                        InputLabelProps={{ shrink: true, }}
                                        required={true}
                                        error={(( 
                                            (this.state.errorText.message !== '' && (this.state.ticket.message === "")) || 
                                            (this.state.errorText.message === "Please add more relevant details of your problem." && this.state.ticket.message.split(" ").length <= this.state.wordCount) || 
                                            (this.state.messageCharsLeft < 0)
                                            ) ? true : false)}
                                        //|| this.state.errorText.message === "Please add more relevant details of your problem."
                                        helperText={this.state.errorText.message}
                                    />
                                    <Typography 
                                        align="right" 
                                        color={(this.state.messageCharsLeft >= 0) ? "textSecondary" : "error"}> 
                                        {
                                        this.state.messageCharsLeft + " characters left"
                                        } 
                                    </Typography>
                                    <Typography
                                        align="left" variant="h6"
                                    >
                                        Email
                                        </Typography>
                                    <TextField
                                        name="email"
                                        type='email'
                                        value={this.state.ticket.email}
                                        onChange={this.handleChange}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        placeholder="eg abc@valid.com"
                                        InputLabelProps={{ shrink: true, }}
                                        required={true}
                                        // error={((this.state.errorText.email !== '' && this.state.ticket.email === '') ? true : false)}
                                        error={(
                                            (this.state.errorText.email !== '' 
                                            ) ? true : false)}
                                        helperText={this.state.errorText.email}
                                    />

                                    <Grid item xs>
                                            <Button
                                                id="submit_button"
                                                variant="contained"
                                                onClick={this.handleSubmit.bind(this, this.state.ticket)}
                                            >
                                                Submit
                                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </React.Fragment>
            )} />
        );
    }
}

// // PropTypes
// NewTicket.propTypes = {
// 	addTicket: PropTypes.func.isRequired
// }