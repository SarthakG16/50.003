import React from "react";
import { Button, Grid } from "@material-ui/core";

class MyFileInput extends React.Component {
    render() {
        const fileType = "application/pdf,image/*,.txt"
        return (
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={8} style={{ marginTop: 10, marginBottom: 40 }}>
                <Grid item>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                    <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            accept={fileType}
                            onChange={() => {
                                document.getElementById("fileField").innerHTML = (document.getElementById("fileInput").files[0] !== undefined) ? document.getElementById("fileInput").files[0].name : "";
                            }}
                        />
                    </Button>
                </Grid>
                <Grid item style = {{paddingLeft: 20}}id="fileField">
                    
                </Grid>
            </Grid>
        );
    }
}

export default MyFileInput;