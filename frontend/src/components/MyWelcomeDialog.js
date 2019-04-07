import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import constants from "../resources/strings";
import handleLogin from "../resources/login";

class MyWelcomeDialog extends React.Component {
  constructor(props) {
    super(props);
    
    this.myWelcomeDialog = props.myState.myWelcomeDialog.registerCallback(this);

    // restoring session
    const {userProfile, myWelcomeDialog} = this.props.myState;

    const sessionToken = localStorage.getItem("sessionToken");

    var data = null;

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        const responseJSON = JSON.parse(this.responseText);

        if (responseJSON.code === 209) {
          myWelcomeDialog.value = Object.assign(myWelcomeDialog.value, { open: true });
        }
        else {
          userProfile.value = responseJSON;          
        }
      }
    });

    xhr.open("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users/me");
    xhr.setRequestHeader("Server-Token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw");
    xhr.setRequestHeader("X-Parse-Session-Token", sessionToken);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    handleLogin(username, password, this.props.myState);

    // const {userProfile, mySnackbar, myWelcomeDialog} = this.props.myState;

    // var data = null;

    // var xhr = new XMLHttpRequest();
    // // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //     const responseJSON = JSON.parse(this.responseText);

    //     if (responseJSON.code === 101) {
    //       mySnackbar.value = Object.assign(mySnackbar.value, { open: true, variant: "error", message: responseJSON.error });
    //     }
    //     else {
    //       userProfile.value = responseJSON;
    //       myWelcomeDialog.value = Object.assign(myWelcomeDialog.value, { open: false });

    //       localStorage.setItem("sessionToken", responseJSON.sessionToken);
    //     }
    //   }
    // });

    // xhr.open("GET", `https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login?username=${username}&password=${password}`);
    // xhr.setRequestHeader("Server-Token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw");
    // xhr.setRequestHeader("cache-control", "no-cache");

    // xhr.send(data);
  };

  handleClose = () => {

  };

  render() {
    const { open } = this.myWelcomeDialog.value;

    return (
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onClose={this.handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{constants.title}</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <form onSubmit={this.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Name"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default MyWelcomeDialog;