function $$$(currency, balance, allowDebt) {
  this._system = undefined;
  this.balance = balance || 0;
  this._allowDebt = allowDebt === true;
  if (typeof currency == "object") {
    this._system = currency;
  } else {
    if (currency == "USD") {
      this._system = {
        penny: 0.01,
        nickel: 0.05,
        dime: 0.10,
        quarter: 0.25,
        dollar_coin: 1.00,
        one_dollar_bill: 1.00,
        two_dollar_bill: 2.00,
        five_dollar_bill: 5.00,
        ten_dollar_bill: 10.00,
        twenty_dollar_bill: 20.00,
        fifty_dollar_bill: 50.00,
        hundred_dollar_bill: 100.00
      }
    }
  }

  this._quantityObject_to_amount = function (amount) {
  	var result = 0;
    if (typeof amount == "object") {
      for (var quantity in amount) {
        if (amount.hasOwnProperty(quantity)) {
         result += this._system[quantity] * amount[quantity];
        }
      }
    }
    return result;
  }

  this.transactionWith = function (user, amount, callback) {
    var message = {
      code: "transaction/success",
      message: "Transaction Successful"
    };
    if (user.constructor.name === "$$$") {
    	if ((Object.keys(this._system).join('}') + "|" + Object.values(this._system).join('}')) == Object.keys(user._system).join('}') + "|" + Object.values(user._system).join('}')) {
    		if (typeof amount == "object") {
    			amount = this._quantityObject_to_amount(amount);
    		}
    		if (-amount > this.balance && !this._allowDebt) {
    			message = {
    				code: "transaction/lack-of-funds",
    				message: "User does not have enough funds to complete the transaction."
    			}
    		} else {
    			if (amount > user.balance && !user._allowDebt) {
    				message = {
    					code: "transaction/lack-of-funds",
    					message: "User does not have enough funds to complete the transaction."
    				}
    			} else {
    				this.balance += amount;
      			user.balance -= amount;
    			}
    		}
    	} else {
    		message = {
    			code: "transaction/incompatible-system",
    			message: "Users use different currency systems."
    		}
    	}
    } else {
      message = {
        code: "transaction/invalid-user",
        message: "User argument passed is not a valid user."
      }
    }
    if (typeof callback == "function")
      callback(message);
  }
}
