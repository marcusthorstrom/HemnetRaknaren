
var listings = document.getElementById("search-results").children

// get the settings
chrome.storage.sync.get(function(items){
  for (var i = 0; i < listings.length; i++) {

    if (listings[i].getElementsByClassName("price").length > 0){
      // Parse the price
      var price = listings[i].getElementsByClassName("price")[0].innerText.replace("kr", "").replace(new RegExp(" ", 'g'), "");
      price = parseInt(price)
      price = price*(1 + (items.increase/100))
    }

    if (listings[i].getElementsByClassName("fee").length > 0) {
      // Parse the montly fee
      var fee = listings[i].getElementsByClassName("fee")[0].innerText.replace("kr/mån", "")
        .replace(new RegExp(" ", 'g'), "").replace(new RegExp(String.fromCharCode(160), "g"), "");
        if(fee===""){
          fee = 0
        }
        fee = parseInt(fee)
    }
    var amortization;
    if(items.amortization === ""){
      amortization = 0
    }else {
      amortization = items.amortization
    }

    var montlyFee = calcMothCost(price, items.intrest, fee, items.cash, amortization, 0);

    if(listings[i].getElementsByClassName("attributes prices").length > 0 && montlyFee > 0) {
      // Now append the new fee to each object.
      var prices = listings[i].getElementsByClassName("attributes prices")[0]

      prices.children[1].innerHTML ="<strike>"+prices.children[1].innerHTML+"</strike>"

      var node = document.createElement("LI")
      node.className = 'item-result-meta-attribute-subtle'
      var textnode = document.createTextNode("~"+Math.round(montlyFee).toLocaleString('sv', style="currency") + " kr/mån");
      node.appendChild(textnode);
      prices.appendChild(node);
    }


  }
})
