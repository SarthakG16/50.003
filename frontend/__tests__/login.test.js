import handleLogin from "../src/resources/login";
import MyState from "../src/components/MyState";

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

it("testing", () => {
    expect(false).toEqual(false);
});


it("login with correct credentials", async () => {
    const myState = {
        userProfile: new MyState({ }),

        myWelcomeDialog: new MyState({ open: true }),
        mySnackbar: new MyState({ open: false, variant: "info", message: "" }),
    };

    handleLogin("userOne", "password", myState);

    await sleep(3000);
    localStorage.getItem("sessionToken");
    expect(myState.myWelcomeDialog.value.open).toBe(false);
    expect(myState.userProfile.value).toBeDefined();
});

it("login with incorrect credentials (username)", async () => {
    const myState = {
        userProfile: new MyState({ }),

        myWelcomeDialog: new MyState({ open: true }),
        mySnackbar: new MyState({ open: false, variant: "info", message: "" }),
    };

    handleLogin("hacker", "password", myState);

    await sleep(3000);

    expect(myState.myWelcomeDialog.value.open).toBe(true);
    expect(myState.userProfile.value).toEqual({ });
});

it("login with incorrect credentials (password)", async () => {
    const myState = {
        userProfile: new MyState({ }),

        myWelcomeDialog: new MyState({ open: true }),
        mySnackbar: new MyState({ open: false, variant: "info", message: "" }),
    };

    handleLogin("userOne", "hacker", myState);

    await sleep(3000);

    expect(myState.myWelcomeDialog.value.open).toBe(true);
    expect(myState.userProfile.value).toEqual({ });
});

it("login with no username", async () => {
    const myState = {
        userProfile: new MyState({ }),

        myWelcomeDialog: new MyState({ open: true }),
        mySnackbar: new MyState({ open: false, variant: "info", message: "" }),
    };

    handleLogin("", "hacker", myState);

    await sleep(3000);

    expect(myState.myWelcomeDialog.value.open).toBe(true);
    expect(myState.userProfile.value).toEqual({ });
});

it("login with no password", async () => {
    const myState = {
        userProfile: new MyState({ }),

        myWelcomeDialog: new MyState({ open: true }),
        mySnackbar: new MyState({ open: false, variant: "info", message: "" }),
    };

    handleLogin("userOne", "", myState);

    await sleep(3000);

    expect(myState.myWelcomeDialog.value.open).toBe(true);
    expect(myState.userProfile.value).toEqual({ });
});