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
         return acc + money.amount;
      }, 0);

      return new Money(sum, currency);
   }
}

module.exports = Portfolio;
