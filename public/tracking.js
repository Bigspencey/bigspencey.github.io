window.optimizely = window.optimizely || [];
// JavaScript SDK Initialization
var optimizelyClientInstance = optimizelyClient.createInstance({datafile: window.DATAFILE});
// Retrieve Full Stack User ID (Presumably from cookie)
var userId = "user123";
/*
	Scenario:
	"exampleExperiment" is running on this page (i.e. we've called getVariation() on the server)
	"nonActiveExperiment" is running, but not on this page so we won't call activate() and send an impression event here.
*/

// We need some way to identify which experiment is active for a given page.
var experimentKey = 'exampleExperiment';
var variationKey = optimizelyClientInstance.activate(experimentKey, userId);

// Take experimentKey and variationKey and send off to Adobe Analytics.
var decisionString = experimentKey + variationKey;
// Use Best Buy's existing `window.track` object.
window.track = {eVar65: decisionString};

// Grab appropriate selectors
var addToCart = document.querySelector(".add-to-cart");
var purchaseConfirmation = document.querySelector(".purchase-confirmation");

// For Full Stack we need to listen for Web events to be dispatched.
window.optimizely.push({
  type: "addListener",
  filter: {
    type: "analytics",
    name: "trackEvent"
  },
  // Attributes are not included in this example, but can be added depending on the use case.
  handler: function(event) {
  	debugger;
  	optimizelyClientInstance.track(event.data.apiName, userId, {}, event.data.tags);
  }
});

// Dispatch tracking calls based on clicks/EventManager events, etc...
addToCart.addEventListener("click", function() {
	window.optimizely.push({
	  type: "event",
	  eventName: "addToCart",
	  tags: {category: 'tvs'}
	});
});

purchaseConfirmation.addEventListener("click", function() {
	window.optimizely.push({
	  type: "event",
	  eventName: "purchaseConfirmation",
	  tags: {units: 2}
	});
});
