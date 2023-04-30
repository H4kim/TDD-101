const { Dollar } = require("./money");

describe("Dollar", () => {
   test("test dollar multiplication", () => {
      const five = new Dollar(5);
      ten = five.times(2);
      expect(ten.amount).toBe(10);
   });
});
