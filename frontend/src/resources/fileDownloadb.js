import React from 'react';
import { Chip } from '@material-ui/core';

export function parseMessage(message, textsOnly) {
    // TODO: remove try catch (only for backward compatibility)
    try {
        const { texts, files } = JSON.parse(message);

        if (texts == undefined || files == undefined) {
            return typeof message === "object" ? JSON.stringify(message) : message;
        }

        if (textsOnly) {
            return typeof texts === "object" ? JSON.stringify(texts) : texts;
        }
        else {
            function edgeSupport(file) {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", file.content, true);
                xhr.responseType = "blob";
                xhr.onload = function (e) {
                    if (this.status == 200) {
                        const blob = this.response;
                        window.navigator.msSaveOrOpenBlob(blob, file.name);
                    }
                };
                xhr.send();
            }

            function downloadHandler(file) {
                if (window.navigator.msSaveOrOpenBlob) {
                    edgeSupport(file);
                }
                else {
                    const a = document.createElement("a");
                    a.href = file.content;
                    a.download = file.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }

            return (
                <div>
                    {texts}<br />
                    <br />
                    {files.length > 0 ? <div>File Attachments: <br /></div> : <div></div>}
                    {
                        files.length > 0 ? files.map(
                            file => {
                                return (
                                    <Chip
                                        key={file.name}
                                        icon={null}
                                        label={file.name}
                                        onClick={() => { downloadHandler(file) }}
                                        style={{ marginTop: 5, marginRight: 5 }}
                                    />
                                    // <div>
                                    //     {/* <a href={file.content} download={file.name}>{file.name}</a><br /> */}
                                    //     <button onClick={() => { downloadHandler(file) }}>{file.name}</button>
                                    // </div>
                                );
                            }
                        ) :
                        <div></div>
                    }
                </div>
            );
        }
    }
    catch (error) {
        return typeof message === "object" ? JSON.stringify(message) : message;
    }
}

it("noop", async () => {
    expect(true).toEqual(true);
});