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
      const euroToUsd = 1.2;

      if (money.currency === currency) {
         return money.amount;
      }

      return money.amount * euroToUsd;
   }
}

module.exports = Portfolio;
