import NewTicket from '../src/components/ticket/NewTicket';

describe('#check params', () => {
    it('all fields filled', () => {
      let tick = new NewTicket();
      expect(tick).toBeTruthy();

      const newticket = {
        title: "Problems with sending email",
        message: "I can't sent emails.",
        category: "Server problems",
        email: "1003031@mymail.sutd.edu.sg"
      }

      let result = tick.handleValidation(newticket);

      expect(result).toEqual(true);
    });

    it('no email so fail', () => {
        let tick = new NewTicket();
        expect(tick).toBeTruthy();
  
        const newticket = {
          title: "Problems with sending email",
          message: "I can't sent emails.",
          category: "Server problems",
          email: ""
        }
  
        let result = tick.handleValidation(newticket);
  
        expect(result).toEqual(false);
      });


      it('no category so fail', () => {
        let tick = new NewTicket();
        expect(tick).toBeTruthy();
  
        const newticket = {
          title: "Problems with sending email",
          message: "I can't sent emails.",
          category: "",
          email: "1003031@mymail.sutd.edu.sg"
        }
  
        let result = tick.handleValidation(newticket);
  
        expect(result).toEqual(false);
      });

      it('no message so fail', () => {
        let tick = new NewTicket();
        expect(tick).toBeTruthy();
  
        const newticket = {
          title: "Problems with sending email",
          message: "",
          category: "Server problems",
          email: "1003031@mymail.sutd.edu.sg"
        }
  
        let result = tick.handleValidation(newticket);
  
        expect(result).toEqual(false);
      });

      it('no title so fail', () => {
        let tick = new NewTicket();
        expect(tick).toBeTruthy();
  
        const newticket = {
          title: "",
          message: "I can't sent emails.",
          category: "Server problems",
          email: "1003031@mymail.sutd.edu.sg"
        }
  
        let result = tick.handleValidation(newticket);
  
        expect(result).toEqual(false);
      });
})
