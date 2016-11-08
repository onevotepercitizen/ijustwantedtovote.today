//i hate javascript
function initializeSurvey(){
  var eventHook = 'change';
  var form = document.getElementById('survey');

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
  form.elements.address.addEventListener(eventHook, function(event){
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
