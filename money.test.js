const Bank = require("./bank");
const { Money } = require("./money");
const Portfolio = require("./portfolio");

let bank;
beforeEach(() => {
   bank = new Bank();
   bank.addExchangeRate("EUR", "USD", 1.2);
   bank.addExchangeRate("USD", "KRW", 1100);
});

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

   expect(portfolio.evaluate(bank, "USD")).toEqual(fifteenDollars);
});

test("euro and usd addition", () => {
   const portfolio = new Portfolio();
   portfolio.add(new Money(5, "USD"), new Money(10, "EUR"));

   expect(portfolio.evaluate(bank, "USD")).toEqual(new Money(17, "USD"));
});

test("dollar and won addition", () => {
   const portfolio = new Portfolio();

   portfolio.add(new Money(1, "USD"), new Money(1100, "KRW"));

   expect(portfolio.evaluate(bank, "KRW")).toEqual(new Money(2200, "KRW"));
});

test("missing exchanges rates", () => {
   const oneDollar = new Money(1, "USD");
   const oneEuro = new Money(1, "EUR");
   const oneWon = new Money(1, "KRW");
   const portfolio = new Portfolio();

   portfolio.add(oneDollar, oneEuro, oneWon);
   function evaluateWithError() {
      portfolio.evaluate(bank, "Kalganid");
   }
   expect(evaluateWithError).toThrow(
      new Error("Missing exchange rate(s): [USD->Kalganid,EUR->Kalganid,KRW->Kalganid]")
   );
});

test("money conversion", () => {
   const tenEuros = new Money(10, "EUR");
   expect(bank.convert(tenEuros, "USD")).toEqual(new Money(12, "USD"));

   bank.addExchangeRate("EUR", "USD", 1.3);
   expect(bank.convert(tenEuros, "USD")).toEqual(new Money(13, "USD"));
});

test("missing echanges rate from the bank", () => {
   function convertWithError() {
      bank.convert(new Money(10, "EUR"), "Kalganid");
   }

   expect(convertWithError).toThrow(new Error("EUR->Kalganid"));
});
