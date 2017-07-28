/*
	All existing event dispatching would still exist in Optimizely's Project JS. (i.e. everything below this line)
*/

document.querySelector(".add-to-cart").addEventListener("click", function() {
	window.optimizely.push({
	  type: "event",
	  eventName: "addToCart",
	  tags: {category: 'tvs'}
	});
});

document.querySelector(".purchase-confirmation").addEventListener("click", function() {
	window.optimizely.push({
	  type: "event",
	  eventName: "purchaseConfirmation",
	  tags: {revenue: 5000, value: 2}
	});
});