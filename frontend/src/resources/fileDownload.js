import React from 'react';

export function parseMessage(message, textsOnly) {
    // TODO: remove try catch (only for backward compatibility)
    try {
        const { texts, files } = JSON.parse(message);

        if (textsOnly) {
            return typeof texts === "object" ? JSON.stringify(texts) : texts;
        }
        else {
            return (
                <div>
                    {texts}<br />
                    <br />
                    File Attachments: <br />
                    {
                        files.map(
                            file => {
                                return (
                                    <div>
                                        <a href={file.content} download={file.name}>{file.name}</a><br />
                                    </div>
                                );
                            }
                        )
                    }
                </div>
            );
        }
    }
    catch (error) {
        return typeof message === "object" ? JSON.stringify(message) : message;
    }
}