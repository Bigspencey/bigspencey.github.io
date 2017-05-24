window.optimizely = window.optimizely || [];
// JavaScript SDK Initialization
var optimizelyClientInstance = optimizelyClient.createInstance({datafile: window.DATAFILE});
var userId = "user123";
/*
	Scenario:
	"exampleExperiment" is running on this page (i.e. we've called getVariation() on the server)
	"nonActiveExperiment" is running, but not on this page so we won't call activate() and send an impression event here.
*/
var experimentKey = 'exampleExperiment';
var variationKey = optimizelyClientInstance.activate(experimentKey, userId);

// Take experimentKey and variationKey and send off to Adobe Analytics.
var decisionString = experimentKey + variationKey;
window.track = {eVar65: decisionString};

// Fullstack + Web Client-Side Tracking
var addToCart = document.querySelector(".add-to-cart");
var purchaseConfirmation = document.querySelector(".purchase-confirmation");

// Very basic wrapper to dispatch events for both Fullstack/Mobile and Web.
// This wrapper assumes that eventNames are consistent across projects.
function sendOptlyEvent(eventName, tagsObject) {
	// Optimizely Web API
	window.optimizely.push({
	  type: "event",
	  eventName: eventName,
	  tags: tagsObject
	});
	// Optimizely Fullstack/Mobile API
	// https://developers.optimizely.com/x/solutions/sdks/reference/index.html?language=javascript#event-tags
	optimizelyClientInstance.track(eventName, userId, {}, tagsObject);
}

addToCart.addEventListener("click", function() {
	sendOptlyEvent("addToCart", {category: 'tvs'})
});

purchaseConfirmation.addEventListener("click", function() {
	sendOptlyEvent("purchaseConfirmation", {units: 2});
});