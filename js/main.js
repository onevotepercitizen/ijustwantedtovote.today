//i hate javascript
function initializeSurvey(){
  var eventHook = 'change';
  var form = document.getElementById('survey');

  if(!form) return;

  var toggleNotIncluded = function(elementId, value) {
    if(value === 'yes') {
      document.getElementById(elementId).className = '';
    } else {
      document.getElementById(elementId).className = 'not-included';
    }
  };

  var changeText = function(elementId, text) {
    if(text != 'undefined'){
      document.getElementById(elementId).innerText = text;
    }
  };

  form.elements.name.addEventListener(eventHook, function(event){
    changeText('name-response', event.target.value);
  });
  form.elements['street-address'].addEventListener(eventHook, function(event){
    changeText('address-response', event.target.value);
    var lookup_link = document.getElementById('lookup-link');
    lookup_link.setAttribute("href", lookup_link.getAttribute("data-base-url") + "?q=" + event.target.value.replace("\n"," "));
  });
  form.elements.voting_location.addEventListener(eventHook, function(event){
    changeText('voting_location-response', event.target.value);
  });
  form.elements.wait_time.addEventListener(eventHook, function(event){
    changeText('wait_time-response', event.target.value);
  });
  form.elements.acceptable.addEventListener(eventHook, function(event){
    changeText('acceptable-response', event.target.value);
  });
  form.elements.intimidation_details.addEventListener(eventHook, function(event){
    changeText('intimidation_details-response', event.target.value);
  });
  form.elements.blocked_details.addEventListener(eventHook, function(event){
    changeText('blocked_details-response', event.target.value);
  });
  form.elements.comments.addEventListener(eventHook, function(event){
    if(event.target.value.length > 0){
      document.getElementById('comments').className = 'comments';
    } else {
      document.getElementById('comments').className = 'not-included';
    }
    changeText('comments', event.target.value);
  });
  form.elements.intimidation.addEventListener(eventHook, function(event){
    toggleNotIncluded("intimidation", event.target.value);
  });
  form.elements.blocked.addEventListener(eventHook, function(event){
    toggleNotIncluded("blocked", event.target.value);
  });
}

if (window.addEventListener) { // Mozilla, Netscape, Firefox
  window.addEventListener('load', initializeSurvey, false); }
else if (window.attachEvent) { // IE
  window.attachEvent('onload', initializeSurvey);
}

function lookupLegislatorAddressFor(lat, long){
  var osUrl = "http://openstates.org/api/v1/legislators/geo/?lat="+ lat +"&long="+long+"&apikey=74a824e4095840e183af1767e3db3b1a"
  httpGetAsync(osUrl, function(text) {
    var legislatorArray = JSON.parse(text);
    var official_names = [];
    var official_addresses = [];
    for(index in legislatorArray){
      var legislator = legislatorArray[index];
      var last_name = legislator.last_name;
      var title = getTitleForChamber(legislator.chamber);
      var name = title + ' ' + last_name;
      official_names.push(name);

      var address = legislator.offices[0].address;
      official_addresses.push(name + "\n" + address);
    }
    document.getElementById('official-name').innerText = official_names.join(' & ')

    if(official_addresses.length > 0){
      var to = document.getElementById('to-address');
      to.className = '';
      var addrs = official_addresses.join("\n\n");
      var replaced = addrs.replace(new RegExp("\n", 'g'), "<br/>");
      to.innerHTML = replaced;
    }
  });
}

function getTitleForChamber(chamber) {
  if(chamber == 'upper') return 'Senator';
  if(chamber == 'lower') return 'Representative';
}

// http://stackoverflow.com/a/4033310/204052
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function geocodingAvailable(){
  window.geocoder = new google.maps.Geocoder();
  document.getElementById('survey').elements['street-address'].addEventListener('change', function(event) {
    window.geocoder.geocode( {'address': event.target.value }, function(results, status){
      if( status == 'OK') {
        var lat = results[0].geometry.location.lat();
        var long = results[0].geometry.location.lng();

        lookupLegislatorAddressFor(lat, long);
      } else {
        console.log('Geocode failed: ' + status);
      }
    });
  });
}
