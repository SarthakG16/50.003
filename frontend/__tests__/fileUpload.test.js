import {getFileList} from "../src/resources/fileUploadb.js";

it("undefined file", async () => {
    const content = ["test"];

    //create file
    const file = new File(content, "foo.txt", {type: "text/plain"});

    const out = await getFileList(undefined);

    expect(out).toEqual([]);
});

it("small file", async () => {
    const content = ['#'.repeat(1000)];
    
    //create file
    const file = new File(content, "foo.txt", {type: "text/plain"});

    const out = await getFileList(file);

    const groundTruth = await new Promise(
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

    expect(out).toEqual(groundTruth);
});

// it("large file", async () => {
//     const content = ['#'.repeat(1000000)];
    
//     //create file
//     const file = new File(content, "foo.txt", {type: "text/plain"});

//     const out = await getFileList(file);

//     const groundTruth = await new Promise(
//         function (resolve, reject) {
//             const fileReader = new FileReader();
//             fileReader.onload = function (e) {
//                 if (e.target.error) {
//                     reject("fileReaderErrorMessage");
//                 }
//                 if (e.target.readyState === 2) {
//                     const fileObject = {
//                         "name": file.name,
//                         "type": file.type,
//                         "content": e.target.result,
//                     }
//                     resolve(
//                         [
//                             fileObject,
//                         ]
//                     );
//                 }
//             }

//             fileReader.readAsDataURL(file);
//         }
//     );

//     expect(out).toEqual(groundTruth);
// });

it("overlimit file", async () => {
    const content = ['#'.repeat(2100000)];
    
    //create file
    const file = new File(content, "foo.txt", {type: "text/plain"});

    try {
        const out = await getFileList(file);
    }
    catch (error) {
        expect(error).toEqual(
            "Error: File size is too big. "
        )
    } 
});
