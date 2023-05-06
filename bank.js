const { Money } = require("./money");

class Bank {
   constructor() {
      this.exchangeRates = new Map();
   }

   addExchangeRate(currencyFrom, currencyTo, rate) {
      this.exchangeRates.set(`${currencyFrom}->${currencyTo}`, rate);
   }

   convert(money, currency) {
      if (money.currency === currency) {
         return new Money(money.amount, money.currency);
      }
      const key = `${money.currency}->${currency}`;
      const rate = this.exchangeRates.get(key);

      if (!rate) {
         throw new Error(key);
      }

      return new Money(money.amount * rate, currency);
   }
}

module.exports = Bank;
