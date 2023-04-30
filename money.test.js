const { Money } = require("./money");

describe("Multiplication", () => {
   test("test dollar multiplication", () => {
      const money = new Money(5, "USD");
      expect(money.times(2)).toEqual(new Money(10, "USD"));
   });

   test("test euro multiplication", () => {
      const money = new Money(10, "EUR");
      expect(money.times(3)).toEqual(new Money(30, "EUR"));
   });
});

describe("Division", () => {
   test("test dollar multiplication", () => {
      const money = new Money(5, "KRW");
      expect(money.divide(2)).toEqual(new Money(2.5, "KRW"));
   });
});
