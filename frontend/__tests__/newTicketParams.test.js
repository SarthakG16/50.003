import NewTicket from '../src/components/ticket/NewTicket';

describe('#check params', () => {
    it('all fields filled', () => {
      let tick = new NewTicket();
      expect(tick).toBeTruthy();

      const newticket = {
        title: "hihi",
        message: "hihi",
        catergory: "hihi",
        email: "1003031@mymail.sutd.edu.sg"
      }

      let result = tick.handleValidation(newticket);

      expect(result).toEqual(true);
    });

    it('no email so fail', () => {
        let tick = new NewTicket();
        expect(tick).toBeTruthy();
  
        const newticket = {
          title: "hihi",
          message: "hihi",
          catergory: "hihi",
          email: ""
        }
  
        let result = tick.handleValidation(newticket);
  
        expect(result).toEqual(false);
      });


      it('no category so fail', () => {
        let tick = new NewTicket();
        expect(tick).toBeTruthy();
  
        const newticket = {
          title: "hihi",
          message: "hihi",
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
          title: "hihi",
          message: "",
          catergory: "hihi",
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
          message: "hihi",
          catergory: "hihi",
          email: "1003031@mymail.sutd.edu.sg"
        }
  
        let result = tick.handleValidation(newticket);
  
        expect(result).toEqual(false);
      });
})
