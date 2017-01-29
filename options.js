// Saves options to chrome.storage
function save_options() {
  var intrest = parseFloat(document.getElementById('intrest').value.replace(new RegExp(" ", 'g'), ""));
  var cash = parseInt(document.getElementById('cash').value.replace(new RegExp(" ", 'g'), ""));
  var amortization = parseInt(document.getElementById('amortization').value.replace(new RegExp(" ", 'g'), ""));
  var increase = parseInt(document.getElementById('increase').value.replace(new RegExp(" ", 'g'), ""));
  chrome.storage.sync.set({
    intrest:intrest,
    cash:cash,
    amortization:amortization,
    increase:increase
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Sparat.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    intrest:2.0,
    cash:100000,
    amortization:0,
    increase:15
  }, function(items) {
    document.getElementById('intrest').value =        items.intrest;
    document.getElementById('cash').value =           items.cash;
    document.getElementById('amortization').value =   items.amortization;
    document.getElementById('increase').value =       items.increase;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
