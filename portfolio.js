const { Money } = require("./money");

class Portfolio {
   constructor() {
      this.moneys = [];
   }

   add(...moneys) {
      this.moneys = [...this.moneys, ...moneys];
   }

   evaluate(currency) {
      const missingExhangeRates = [];
      const sum = this.moneys.reduce((acc, money) => {
         const rate = this.convert(money, currency);
         if (typeof rate === "undefined") {
            missingExhangeRates.push(`${money.currency}->${currency}`);
            return;
         }
         return acc + rate;
      }, 0);

      if (missingExhangeRates.length) {
         throw new Error(`Missing exchange rate(s): [${missingExhangeRates.join(",")}]`);
      }
      return new Money(sum, currency);
   }

   convert(money, currency) {
      const exchangeRates = new Map();
      exchangeRates.set("EUR->USD", 1.2);
      exchangeRates.set("USD->KRW", 1100);

      if (money.currency === currency) {
         return money.amount;
      }

      const rate = exchangeRates.get(`${money.currency}->${currency}`);

      if (!rate) {
         return undefined;
      }

      return money.amount * rate;
   }
}

module.exports = Portfolio;
