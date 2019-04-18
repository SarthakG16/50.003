const handleLogin = (username, password, myState) => {
    const {userProfile, mySnackbar, myWelcomeDialog} = myState;

    if (username.length > 128 || password.length > 128) {
      mySnackbar.value = Object.assign(mySnackbar.value, { open: true, variant: "error", message: "Your username and/ or password is too long. " });
      return
    }

    var data = null;

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        const responseJSON = JSON.parse(this.responseText); 
        if (responseJSON.error != null) {
          mySnackbar.value = Object.assign(mySnackbar.value, { open: true, variant: "error", message: responseJSON.error });
        }
        else {
          window.location.href =  "/";
          localStorage.setItem("objectId", responseJSON.objectId);
          localStorage.setItem("sessionToken", responseJSON.sessionToken);    
          userProfile.value = responseJSON;
          myWelcomeDialog.value = Object.assign(myWelcomeDialog.value, { open: false });
          
          
        }
      }
    });

    xhr.open("GET", `https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login?username=${username}&password=${password}`);
    xhr.setRequestHeader("Server-Token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJWVkpYS1lmZkdNdFZBRUwwYjFuVmNVcUFYY2IwZzhrM0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MzgsImV4cCI6MTU1MjU0NDkzOCwiYXpwIjoiVlZKWEtZZmZHTXRWQUVMMGIxblZjVXFBWGNiMGc4azMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XYoNbl50Gyuk7xNPK64GZLEdNMs18uAf4sFMiQn6lOUv3tw0espP5avymr-GsFXgnl2kugClsb_ybBkuSvchqp8dvvL1dyejiumyZCTw0FluNWqGqiNJb4mGTEeNRUCxexgrTm5yV2ZxPNFpfumD44GLYBaW_EVJden3hi9XJ8UpD1MrXuZD8YUEtZ_sHKS9bcZxSJoyqbu3n7l0p0K_q74FSY34xwey2SpbX3Zipng5Mk2KYlw0L6kMiJSsmChgerG_gWkSGjhM8mcuURGtCYTxucEyuaxmBI8kNP7VuvGXYBwiAcL2dH7FSES09XKZS7z0ie5ax_vvO4JoLxztgw");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
};

export default handleLogin;