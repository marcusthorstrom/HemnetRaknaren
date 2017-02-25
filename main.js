
// Returns the price of the apartment/house, -1 if it is not possible to buy
function calcMothCost(price, intrest, monthlyFee, cash, amortization, runningCost) {
  // First, check if the cash is atleast 15% of the price - Amorteringskravet
  if(price*0.15 > cash) {
    return -1
  }

  var monthlyInterest = calcIntrest(price, cash, intrest)
  var montlyAmortization = calcAmortization(price, cash, amortization)
  return (monthlyInterest + montlyAmortization + monthlyFee + runningCost)

}

function calcAmortization(price, cash, amortization) {
  var loan = price - cash
  if (loan <= 0) {
    return 0
  }
  var montlyAmortization = 0
  // If the loan is greater then 75% of the value, amortization has to be 2% each year
  if (loan > price*0.75) {
    montlyAmortization = (loan*0.02)/12
  // If the loan is greater than 50% of the value, amortization has to be 1% each year
  } else if(loan > price*0.50) {
    montlyAmortization = (loan*0.01)/12
  }
  // If the desired Amortization is not larger then the minimal, change it
  if(montlyAmortization > amortization) {
    amortization = montlyAmortization
  }
  return amortization
}
function calcIntrest(price, cash, intrest) {
  var loan = price - cash
  if (loan <= 0) {
    return 0
  }
  return (loan * (intrest/100)) / 12
}
