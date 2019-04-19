
function checkEmail(e) {
    // var re = /\S+@\S+\.\S+/;
    var re = /^(([^<>()\[\]\\.,;*:\s@"]+(\.[^<>()\[\]\\.,;:*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e);
}

describe('#check if params are filled', () => {
    it('checking if email is valid (true) test 1', () => {
        var emailIn = "1003031@mymail.sutd.edu.sg";
        let result = checkEmail(emailIn);

        expect(result).toEqual(true);
    });

    it('checking if email is valid (true) test 2', () => {
        var emailIn = "zhaotong_tan@mymail.sutd.edu.sg";
        let result = checkEmail(emailIn);

        expect(result).toEqual(true);
    });

    it('checking if email is valid (false) test 1', () => {
        var emailIn = "1003031@mymail";
        let result = checkEmail(emailIn);

        expect(result).toEqual(false);
    });

    it('checking if email is valid (false) test 2', () => {
        var emailIn = "1003031@@mymail.sutd.edu.sg";
        let result = checkEmail(emailIn);

        expect(result).toEqual(false);
    });

    it('checking if email is valid (false) test 3', () => {
        var emailIn = "1003^031@mymail.su*td.edu.sg";
        let result = checkEmail(emailIn);

        expect(result).toEqual(false);
    });

    it('checking if email is valid (false) test 4', () => {
        var emailIn = "1003031@mymail.sutd.ed/u.sg";
        let result = checkEmail(emailIn);

        expect(result).toEqual(false);
    });

})
