export async function appendFileToMessage(message) {
    // TODO: check for injected file string/s

    message = {
        "texts": message,
        "files": await getFileList(),
    }

    return JSON.stringify(message);
}

function getFileList() {
    const fileSize = 64 * 1e6;
    const fileSizeErrorMessage = "Error: File size is too big. ";
    const fileReaderErrorMessage = "Error: File upload failed. ";

    function getFileString(resolve, reject, file) {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            if (e.target.error) {
                reject(fileReaderErrorMessage);
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

    return new Promise(
        function (resolve, reject) {
            try {
                const file = document.getElementById("fileInput").files[0];

                if (file.size > fileSize) {
                    reject(fileSizeErrorMessage);
                }
                else {
                    getFileString(resolve, reject, file);
                }
            }
            catch (error) {
                resolve([]);
            }
        }
    );
}