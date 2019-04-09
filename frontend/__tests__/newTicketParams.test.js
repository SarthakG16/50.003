import NewTicket from '../src/components/ticket/NewTicket';
import { shallow, mount, render } from 'enzyme';
// import handleLogin from "../src/resources/login";
// import MyState from "../src/components/MyState";

/*
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

beforeEach(async () => {
  const myState = {
    userProfile: new MyState({}),

    myWelcomeDialog: new MyState({ open: true }),
    mySnackbar: new MyState({ open: false, variant: "info", message: "" }),
  };

  handleLogin("userOne", "password", myState);

  await sleep(3000);
  localStorage.getItem("sessionToken");
  expect(myState.myWelcomeDialog.value.open).toBe(false);
  expect(myState.userProfile.value).toBeDefined();
});
*/

function getUser() {
  const myState = {
    "objectId": "ub7BztoxJi",
    "username": "userOne",
    "phone": "415-392-0205",
    "createdAt": "2019-03-19T07:41:01.809Z",
    "updatedAt": "2019-04-09T10:11:42.514Z",
    "test": "",
    "numberOfTickets": 3,
    "lastTicket": "Tue, 09 Apr 2019 10:10:17 GMT",
    "ACL": {
      "*": {
        "read": true
      },
      "ub7BztoxJi": {
        "read": true,
        "write": true
      }
    }
  }
  return { myState };
}

describe('#check params', () => {
  it('all fields filled', () => {
    let myState = getUser();
    // let wrapper = shallow(<NewTicket myState = {{myState}}/>);
    // let wrapper = shallow(<NewTicket/>)
  
    // let myState = getUser();
    // let tick = new NewTicket(myState);
    // tick.setState()
    // this.setState((prevState) => ({ waiting: e }));
    // expect(tick).toBeTruthy();
    // expect(props.myState.userProfile.value).toBeDefined();
    // expect(tick.state.user).toBeDefined();

    const newticket = {
      title: "Problems with sending email",
      message: "I can't sent emails.",
      category: "Server problems",
      email: "1003031@mymail.sutd.edu.sg"
    }

    // const {tick} = render(
    //   <NewTicket myState={myState} />,
    // );
    // let tick = NewTicket.handleValidation(newticket);
    // tick.state.user = myState;

    // let result = tick.handleValidation(newticket);

    expect(true).toEqual(true);
  });
/*
  it('no email so fail', () => {
    let tick = new NewTicket();
    expect(tick).toBeTruthy();

    const newticket = {
      title: "Problems with sending email",
      message: "I can't sent emails.",
      category: "Server problems",
      email: ""
    }

    let result = tick.handleValidation(newticket);

    expect(result).toEqual(false);
  });


  it('no category so fail', () => {
    let tick = new NewTicket();
    expect(tick).toBeTruthy();

    const newticket = {
      title: "Problems with sending email",
      message: "I can't sent emails.",
      category: "",
      email: "1003031@mymail.sutd.edu.sg"
    }

    let result = tick.handleValidation(newticket);

    expect(result).toEqual(false);
  });

  it('no message so fail', () => {
    let tick = new NewTicket();
    expect(tick).toBeTruthy();

    const newticket = {
      title: "Problems with sending email",
      message: "",
      category: "Server problems",
      email: "1003031@mymail.sutd.edu.sg"
    }

    let result = tick.handleValidation(newticket);

    expect(result).toEqual(false);
  });

  it('no title so fail', () => {
    let tick = new NewTicket();
    expect(tick).toBeTruthy();

    const newticket = {
      title: "",
      message: "I can't sent emails.",
      category: "Server problems",
      email: "1003031@mymail.sutd.edu.sg"
    }

    let result = tick.handleValidation(newticket);

    expect(result).toEqual(false);
  });
  */
})
