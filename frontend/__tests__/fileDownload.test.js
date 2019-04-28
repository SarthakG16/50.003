import {parseMessage} from "../src/resources/fileDownloadb.js";

it("small file attached to message", async () => {
    const content = ['#'.repeat(1000)];
    const message = "test message. ";
    
    //create file
    const file = new File(content, "foo.txt", {type: "text/plain"});

    const filesArray = await new Promise(
        function (resolve, reject) {
            const fileReader = new FileReader();
            fileReader.onload = function (e) {
                if (e.target.error) {
                    reject("fileReaderErrorMessage");
                }
                if (e.target.readyState === 2) {
                    const fileObject = {
                        "name": file.name,
                        "type": file.type,
                        "content": e.target.result,
                    }
                    resolve(
                        [
                            fileObject,
                        ]
                    );
                }
            }

            fileReader.readAsDataURL(file);
        }
    );

    const processedMessage = JSON.stringify({
        "texts": message,
        "files": filesArray,
    });

    const out = parseMessage(processedMessage, true);

    expect(out).toEqual(message);
});

it("no file attached to message", async () => {
    const content = ['#'.repeat(1000)];
    const message = "test message. ";

    const processedMessage = JSON.stringify({
        "texts": message,
        "files": [],
    });

    const out = parseMessage(processedMessage, true);

    expect(out).toEqual(message);
});

it("malformed message", async () => {
    const content = ['#'.repeat(1000)];
    const message = "test message. ";
    
    //create file
    const file = new File(content, "foo.txt", {type: "text/plain"});

    const filesArray = await new Promise(
        function (resolve, reject) {
            const fileReader = new FileReader();
            fileReader.onload = function (e) {
                if (e.target.error) {
                    reject("fileReaderErrorMessage");
                }
                if (e.target.readyState === 2) {
                    const fileObject = {
                        "name": file.name,
                        "type": file.type,
                        "content": e.target.result,
                    }
                    resolve(
                        [
                            fileObject,
                        ]
                    );
                }
            }

            fileReader.readAsDataURL(file);
        }
    );

    const processedMessage = JSON.stringify({
        "tefgxts": message,
        "filfges": filesArray,
    });

    const out = parseMessage(processedMessage, true);

    expect(out).toEqual(processedMessage);
});
