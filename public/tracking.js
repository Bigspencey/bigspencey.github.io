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
// Use the existing `window.track` object to set the integration for Adobe.
window.track = {eVar65: decisionString};

// For Full Stack we need to listen for Web events to be dispatched.
window.optimizely = window.optimizely || [];
window.optimizely.push({
  type: "addListener",
  filter: {
    type: "analytics",
    name: "trackEvent"
  },
  // Attributes are not included in this example, but can be added depending on the use case.
  handler: function(event) {
  	// Revenue and Numeric Metric values are under the metrics object so need to merge with tags for Full Stack.
  	var tags = Object.assign(event.data.metrics, event.data.tags);
  	optimizelyClientInstance.track(event.data.apiName, userId, {}, tags);
  }
});
