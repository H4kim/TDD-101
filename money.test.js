const { Money } = require("./money");
const Portfolio = require("./portfolio");

test("test multiplication", () => {
   const money = new Money(5, "USD");
   expect(money.times(2)).toEqual(new Money(10, "USD"));
});

test("test division", () => {
   const money = new Money(5, "KRW");
   expect(money.divide(2)).toEqual(new Money(2.5, "KRW"));
});

test("portfolio addition", () => {
   const tenDollars = new Money(10, "USD");
   const fiveDollars = new Money(5, "USD");
   const fifteenDollars = new Money(15, "USD");
   const portfolio = new Portfolio();
   portfolio.add(tenDollars, fiveDollars);

   expect(portfolio.evaluate("USD")).toEqual(fifteenDollars);
});
