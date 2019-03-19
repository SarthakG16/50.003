import Tickets from '../src/components/ticket/Tickets';
import $ from 'jquery';
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { ExpansionPanelActions } from '@material-ui/core';

// sinon.spy(Tickets.prototype, "componentDidMount");
// const wrapper = mount(<Tickets />);
// expect(wrapper.instance().componentDidMount).toHaveBeenCalled();
it('should do something', () => {
  const spy = jest.spyOn(Tickets.prototype, 'componentDidMount');
  const wrapper = mount(<Tickets />);
  let aaa = wrapper.instance();
  aaa.componentDidMount();
  // expect(spy).toHaveBeenCalled();
  expect(aaa.state.isLoaded).toEqual(true);
})

// describe('#get ticket', () => {
//     it('should load ticket', () => {
//       let tick = new Tickets;
//       var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets",
//         "method": "GET",
//         "headers": {
//           "Content-Type": "application/json",
//           "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
//           "cache-control": "no-cache",
//         },
//         "processData": false,
//         "data": ""
//       };
      
//       $.ajax(settings).done((response) => {
//           tick.setState({
//               isLoaded:true,
//               tickets:response.results
//           })
//           // .then(data => {
//           //   expect(data).toBeDefined()
//           //   expect(data.entity.name).toEqual('Koen van Gilst')
//           // })
//     })
//     expect(tickets).toEqual("a"); 
//   })
// })

// it("should call sort ids", () => {
//   const wrapper = shallow(<Tickets />);
//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Tickets",
//     "method": "GET",
//     "headers": {
//       "Content-Type": "application/json",
//       "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw",
//       "cache-control": "no-cache",
//     },
//     "processData": false,
//     "data": ""
//   };
  
//   $.ajax(settings).done((response) => {
//       wrapper.setState({
//           isLoaded:true,
//           tickets:response.results
//       })
//       // .then(data => {
//       //   expect(data).toBeDefined()
//       //   expect(data.entity.name).toEqual('Koen van Gilst')
//       // })
// })
//   wrapper.update();    // Force re-rendering 
//   wrapper.instance().componentDidMount();
//   expect(wrapper.instance()).toEqual('a');
// });

// describe('basic route tests', () => {
//     test('get home route GET /', async () => {
//     const response = await request(server).get('/');
//     expect(response.status).toEqual(200);
//     expect(response.text).toContain('Hello World!');
//     });
//    });
