const { Money } = require("./money");

class Portfolio {
   constructor() {
      this.moneys = [];
   }

   add(...moneys) {
      this.moneys = [...this.moneys, ...moneys];
   }

   evaluate(currency) {
      const sum = this.moneys.reduce((acc, money) => {
         return acc + this.convert(money, currency);
      }, 0);

      return new Money(sum, currency);
   }

   convert(money, currency) {
      const exchangeRates = new Map();
      exchangeRates.set("EUR->USD", 1.2);
      exchangeRates.set("USD->KRW", 1100);

      if (money.currency === currency) {
         return money.amount;
      }

      return money.amount * exchangeRates.get(`${money.currency}->${currency}`);
   }
}

module.exports = Portfolio;
