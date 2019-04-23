import React from "react";
import { Button, Grid } from "@material-ui/core";

class MyFileInput extends React.Component {
    render() {
        const fileType = "application/pdf,image/*,.txt"
        return (
            <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8} style={{ marginTop: 10, marginBottom: 40 }}>
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
                                document.getElementById("fileField").innerHTML = document.getElementById("fileInput").value;
                            }}
                        />
                    </Button>
                </Grid>
                <Grid item id="fileField">
                    
                </Grid>
            </Grid>
        );
    }
}

export default MyFileInput;