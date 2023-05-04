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

test("euro and usd addition", () => {
   const portfolio = new Portfolio();
   portfolio.add(new Money(5, "USD"), new Money(10, "EUR"));

   expect(portfolio.evaluate("USD")).toEqual(new Money(17, "USD"));
});

test("dollar and won addition", () => {
   const portfolio = new Portfolio();
   portfolio.add(new Money(1, "USD"), new Money(1100, "KRW"));

   expect(portfolio.evaluate("KRW")).toEqual(new Money(2200, "KRW"));
});
