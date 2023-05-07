const { Money } = require("./money");

class Portfolio {
   constructor() {
      this.moneys = [];
   }

   add(...moneys) {
      this.moneys = [...this.moneys, ...moneys];
   }

   evaluate(bank, currency) {
      const missingExhangeRates = [];
      const sum = this.moneys.reduce((acc, money) => {
         try {
            const bankMoney = bank.convert(money, currency);
            return acc + bankMoney.amount;
         } catch ({ message }) {
            missingExhangeRates.push(message);
         }
      }, 0);

      if (missingExhangeRates.length) {
         throw new Error(`Missing exchange rate(s): [${missingExhangeRates.join(",")}]`);
      }
      return new Money(sum, currency);
   }
}

module.exports = Portfolio;
