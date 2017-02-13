// When the page is loaded
var space = document.getElementById("property-tools__anchor")

if(!chrome.storage) { // NO storage == No settings
  var a =
  "<h2 class='section__heading section__heading--plain' style='text-align:center'><span>Hemnet Räknaren</span></h2>"+
  '<div class="hemnetContainer">'+
  "<p>Aktivera tillägget genom att fylla i de inställningar som finns. Då kan tillägget beräkna kostnaden."+
  "</div>"

  space.outerHTML = space.outerHTML + a
} else {
  chrome.storage.sync.get(function(items){
    // Get the fee
    var attributes = document.getElementsByClassName("property__attributes")[0]
    var fee = 0;
    for (var i = 0; i < attributes.children.length; i++) {
      if (attributes.children[i].innerText === "Avgift/månad") {
        // Save the one that comes after
        fee = attributes.children[i+1].innerText.replace("kr/mån", "")
          .replace(new RegExp(" ", 'g'), "").replace(new RegExp(String.fromCharCode(160), "g"), "");
        fee = parseInt(fee)
      }
    }
    var amortization;
    if(items.amortization === ""){
      amortization = 0
    }else {
      amortization = items.amortization
    }


    // Get the price
    var price = parseInt(document.getElementsByClassName("property__price")[0].innerText
      .replace(new RegExp(" ", 'g'), "").replace("kr",""))
    price = price*(1 + (items.increase/100))


    var b  =
    "<h2 class='section__heading section__heading--plain' style='text-align:center'><span>Hemnet Räknaren</span></h2>"+
    '<div class="hemnetContainer">'+
    "<p>De priset som angivets faller utanför ramen om 15% kontantinsats.</p>"+
    "<p>De pris som angivits efter procentuell stigning är: "+Math.round(price).toLocaleString('sv', style="currency")+" kr</p>"+
    "</div>"

    // Now display it all
    var a =
    "<h2 class='section__heading section__heading--plain' style='text-align:center'><span>Hemnet Räknaren</span></h2>"+
    '<div class="hemnetContainer">'+
    "<p>Räknar med ett slutpris på: "+Math.round(price).toLocaleString('sv', style="currency")+" kr</p>"+
    "<h4 style='text-align:center'>Månadskostnader</h4>"+
    "<table id='hemnetRäknaren'>"+
      "<thead>"+
        "<tr><th>Utgift</th><th>Pris</th></tr>"+
      "</thead>"+
      "<tr><td>Månadsavgift</td><td>"+fee.toLocaleString('sv', style="currency")+"</td></tr>"+
      "<tr><td>Amortering</td><td>"+Math.round(calcAmortization(price, items.cash, amortization)).toLocaleString('sv', style="currency")+"</td></tr>"+
      "<tr><td>Ränta*</td><td>"+Math.round(calcIntrest(price, items.cash, items.intrest)).toLocaleString('sv', style="currency")+"</td></tr>"+
      "<tr class='summation'><td>Summa</td><td>"+Math.round(calcMothCost(price, items.intrest, fee, items.cash, amortization)).toLocaleString('sv', style="currency")+"</td></td>"+
    "</table>"+
    "<p>*Inkluderar ej ränteavdrag på ca 30%"+
    "<h4 style='text-align:center'>Ränteförändringar</h4>"+
    "<table id='ränteändring'>"+
      "<thead>"+
        "<tr><th>Ränteskillnad</th><th>Totalavgift</th></tr>"+
      "</thead>"+
      "<tr><td>"+items.intrest+"%</td><td>"+Math.round(calcMothCost(price, items.intrest, fee, items.cash, amortization)).toLocaleString('sv', style="currency")+"</td></tr>"+
      "<tr><td>"+(items.intrest+1)+"%</td><td>"+Math.round(calcMothCost(price, (items.intrest+1), fee, items.cash, amortization)).toLocaleString('sv', style="currency")+"</td></tr>"+
      "<tr><td>"+(items.intrest+2)+"%</td><td>"+Math.round(calcMothCost(price, (items.intrest+2), fee, items.cash, amortization)).toLocaleString('sv', style="currency")+"</td></tr>"+
      "<tr><td>"+(items.intrest+3)+"%</td><td>"+Math.round(calcMothCost(price, (items.intrest+3), fee, items.cash, amortization)).toLocaleString('sv', style="currency")+"</td></tr>"+

    "</table>"+
    "<style>"+
    " #hemnetRäknaren tr:nth-child(odd) {background-color: #f2f2f2}"+
    "  #hemnetRäknaren {width:100%; text-align:left;}"+
    "  .summation {"+
      "  font-weight: bold;"+
    "  }"+
    " #ränteändring {margin-top:20px;}"+
    " #ränteändring {width:100%; text-align:left;}"+
    " #ränteändring tr:nth-child(odd) {background-color: #f2f2f2}"+
    ".hemnetContainer {border:solid 1px #ddd}"
    "</style>"
    "</div>"

    if(calcMothCost(price, items.intrest, fee, items.cash, amortization) == -1) {
      space.outerHTML = space.outerHTML + b

    } else {

      space.outerHTML = space.outerHTML + a
    }


  })
}
