const RESET_VALUES_ERROR = { title: '', message: '', category: '', email: '' };

function handleValidation(e) {
    let ticket = e;
    var errorTextCopy = Object.assign({}, RESET_VALUES_ERROR);
    var count = 0;
    if (ticket.title === '') {
        // console.log('No title');
        errorTextCopy.title = 'Please fill in a title';
        count += 1;
    }
    else {
        errorTextCopy.title = '';
    }

    if (ticket.category === '') {
        // console.log('No category');
        errorTextCopy.category = 'Please fill in a category';
        count += 1;
    }
    else {
        errorTextCopy.category = '';
    }

    if (ticket.message === '') {
        // console.log('No message');
        errorTextCopy.message = 'Please fill in a message';
        count += 1;
    }
    else {
        // var relevant = checkMessageRevelance(ticket.message);
        var relevant = true
        // console.log("what is the relevance value " + relevant);
        if (relevant) {
            errorTextCopy.message = '';
        }
        else {
            errorTextCopy.message = 'Please add more relevant details of your problem.';
            count += 1;
        }
    }

    if (ticket.email === '') {
        // console.log('No email');
        errorTextCopy.email = 'Please fill in a email';
        count += 1;
    }
    else {
        errorTextCopy.email = '';
    }

    if (count === 0) {
        return true;
    }
    else {
        return false;
    }
}

describe('#check if params are filled', () => {
    it('all fields filled and valid', () => {

        const newticket = {
            title: "Problems with sending email",
            message: "I can't sent emails. I am having this problem since last week. I have already contacted you guys 5 times  but there was no reply. HOw can you keep a customer waiting so long.",
            category: "Others",
            email: "1003031@mymail.sutd.edu.sg"
        }

        let result = handleValidation(newticket);
        expect(result).toEqual(true);
    });

    it('no email so fail', () => {

        const newticket = {
            title: "Problems with sending email",
            message: "I can't sent emails. I am having this problem since last week. I have already contacted you guys 5 times  but there was no reply. HOw can you keep a customer waiting so long.",
            category: "Others",
            email: ""
        }

        let result = handleValidation(newticket);

        expect(result).toEqual(false);
    });

    it('no category so fail', () => {

        const newticket = {
            title: "Problems with sending email",
            message: "I can't sent emails. I am having this problem since last week. I have already contacted you guys 5 times  but there was no reply. HOw can you keep a customer waiting so long.",
            category: "",
            email: "1003031@mymail.sutd.edu.sg"
        }

        let result = handleValidation(newticket);

        expect(result).toEqual(false);
    });

    it('no message so fail', () => {

        const newticket = {
            title: "Problems with sending email",
            message: "",
            category: "Others",
            email: "1003031@mymail.sutd.edu.sg"
        }

        let result = handleValidation(newticket);

        expect(result).toEqual(false);
    });

    it('no title so fail', () => {

        const newticket = {
            title: "",
            message: "I can't sent emails. I am having this problem since last week. I have already contacted you guys 5 times  but there was no reply. HOw can you keep a customer waiting so long.",
            category: "Others",
            email: "1003031@mymail.sutd.edu.sg"
        }

        let result = handleValidation(newticket);

        expect(result).toEqual(false);
    });


})
