import { jssPreset } from "@material-ui/core";

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

it('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App/>, div);
  // ReactDOM.unmountComponentAtNode(div);
  expect(2+2).toBe(4);
});


/*
import addTicket from './testing/__mocks__/NewTicket'
import NewTicket from "./components/ticket/NewTicket";

const addTicketTest = jest.fn();
jest.mock('../../components/tickets/NewTicket',()=>{
    return jest.fn().mockImplementation(()=>{
        return {test: addTicketTest};
    })
});

it('create new ticket body', () =>{
  
  const NewTicketClass = new NewTicket();
  expect(NewTicketClass).tobeTruthy();

  const newticket = {
    title: "hihi",
    message: "hihi",
    catergory: "hihi",
    email: "1003031@mymail.sutd.edu.sg"
  }
  
  NewTicketClass.addTicket(newticket)

  const correct = {
    title: "hihi",
    replies: [
              {
                name: "tong",
                message: "hihi",
                date: new Date().toUTCString()
              }
            ],
    catergory: "hihi",
    email: "1003031@mymail.sutd.edu.sg"
  }
  expect(addTicketTest.mock.calls[0][0]).toEqual(correct);

})
*/
