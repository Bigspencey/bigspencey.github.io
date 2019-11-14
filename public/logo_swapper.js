var referrer = document.referrer;
var counter = 0;
var swapped = false;
var allLogoSelectors = ".rc-brand, .store-logo, .company-brand, .logo";
var uplightPartners = {
  "jacksonemcmarketplace": {
    logoURL: "https://jacksonemcmarketplace.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw44f63140/JacksonEMC/images/logo-header.svg",
    URL: "https://jacksonemcmarketplace.com/"
  },
  "georgiapowermarketplace": {
    logoURL: "https://georgiapowermarketplace.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwd3060cfd/GeorgiaPower/images/logo-header.svg",
    URL: "https://georgiapowermarketplace.com/"
  },
  "cenhubstore": {
    logoURL: "https://cenhubstore.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw3e8d3d51/Cenhub/images/logo-header.svg",
    URL: "https://cenhubstore.com/"
  },
  "focusonenergymarketplace": {
    logoURL: "https://focusonenergymarketplace.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw15d9524d/FOE/images/logo-header.svg",
    URL: "https://focusonenergymarketplace.com/"
  },
  "hcestore": {
    logoURL: "https://hcestore.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw6046a418/HolyCross/images/logo-header.svg",
    URL: "https://hcestore.com/"
  },
  "comedmarketplace": {
    logoURL: "https://comedmarketplace.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw0ac25e52/ComEd/images/logo-header.svg",
    URL: "https://comedmarketplace.com/"
  },
  "bgemarketplace": {
    logoURL: "https://www.bgemarketplace.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw57797aae/BGE/images/logo-header.svg",
    URL: "https://www.bgemarketplace.com/"
  },
  "smudenergystore": {
    logoURL: "https://smudenergystore.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw941552cd/SMUD/images/logo-header.svg",
    URL: "https://smudenergystore.com/"
  },
  "marketplace.pseg": {
    logoURL: "https://marketplace.pseg.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwc20fd99f/PSEG/images/logo-header.svg",
    URL: "https://marketplace.pseg.com/"
  },
  "uplight": {
    logoURL: "https://web-img.dev.return.ly/sl/3aa/929/398/377ae10f1bcd34c32a14357/full_size.jpg",
    URL: "https://uplight.com/"
  },
};

// Swaps header logo across relevant pages within the Return Center
var swapLogo = function(logoURL, URL) {
  // Homepage
  $(".rc-brand > a").attr("href", URL);
  $(".rc-brand > a > img").attr("src", logoURL);

  // Products Page, Address Confirmation
  $(".store-logo > a").attr("href", URL);
  $(".store-logo > a > img").attr("src", logoURL);

  // Return Status Page, Return Cancelled
  $(".company-brand > a").attr("href", URL);
  $(".company-brand > a > img").attr("src", logoURL);

  // Return Confirmation
  $(".logo > a").attr("href", URL);
  $(".logo > a > img").attr("src", logoURL);
  swapped = true;
};

// Waits for element to be present on the page. Calls swapLogo once elements are ready.
var waitForElement = function(selector, logoURL, URL) {
    counter++;
    if (counter === 10) {
        return;
    }
        if($(selector) !== null) {
            swapLogo(logoURL, URL);
            return;
        }
        else {
            setTimeout(function() {
                waitForElement(selector, logoURL, URL);
            }, 250);
        }
}

// Set Cookie Method
var setCookie = function(c_name,value,exdays,c_domain) {
  c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=decodeURIComponent(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value + ";" + c_domain + "path=/";
};

// Get Cookie Method
var getCookie = function(name) {
  var match = document.cookie.match(name+'=([^;]*)');
  return match ? match[1] : undefined;
};


// Swaps logo and sets Returnly cookie for future sessions.
$.each(uplightPartners, function (key, value) {
  if (referrer.indexOf(key) !== -1) {
    waitForElement(allLogoSelectors, value.logoURL, value.URL);
    setCookie("rtlyLogoLookup", key, 30);
  }
});

// If there is no relevant referrer (no logo swap occurred), then check the "rtlyLogoLookup" cookie for a saved value. If no cookie exists, then do nothing (default Uplight)
if (swapped === false) {
  $.each(uplightPartners, function (key, value) {
    if (getCookie("rtlyLogoLookup") === key) {
      waitForElement(allLogoSelectors, value.logoURL, value.URL);
      setCookie("rtlyLogoLookup", key, 30);
    }
  });
}
