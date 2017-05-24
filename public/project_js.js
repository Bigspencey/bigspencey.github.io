// JavaScript SDK Initialization
var optimizelyClientInstance = optimizelyClient.createInstance({datafile: window.DATAFILE});

/*
	Scenario:
	"exampleExperiment" is running on this page (i.e. we've called getVariation() on the server)
	"nonActiveExperiment" is running, but not on this page so we won't call activate() and send an impression event here.
*/

// Fullstack + Web Client-Side Tracking
