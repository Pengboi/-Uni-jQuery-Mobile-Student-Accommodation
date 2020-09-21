$(document).on("pagecontainerbeforeshow", function (e, ui){
    let page = ui.toPage[0].id;
	if(page == "interests"){
        // if browser supports local storage capabilities, stored properteis are fetched, else - user is made aware browser does not support local storage
		if (typeof(Storage) != "undefined"){
			showCacheProperties(fetchCacheProperties());
		}
		else{
            $("#unsupported").text("This browser does not support local storage. Please update or use another browser.");
		}
	}
});

function showCacheProperties(cache){
    let propertyhtml = "";
    // if stored cache is non-existent or contains no properties, page html infroms user there are no registered interestss
    if (cache === null || cache === "[]")
    {
        propertyhtml = "<p>You have not registered any interests.</p>";
        $("#property").html(propertyhtml);
        return;
    }
    /*
     *  Else, if properties are stored within cache, a for loop occurs where for each property contained in the stored JSON file, 
     *  a link is appended to the page html contianing the property name as well - linked to the property page
     *  a page break is then appeneded
     *  a link is appended containing the phrase Remove *property name*, when pressed the removeInterest function in setProperty.js is triggered with the button text as argument (this)
     */
    for (var property of cache) 
    {
        propertyhtml = propertyhtml + 
        "<a href=\"" + property.propertyurl + ".html\" rel=\"external\" class=\"ui-btn ui-corner-all ui-icon-home ui-btn-icon-left \">" + property.name + "</a>" +
        "<br>" +
        "<a onclick=\"removeInterest(this)\" href=\"#\">Remove " + property.name + "</a> <br><br>";
    }
	$("#property").html(propertyhtml);
}

// defined variable propertyCache as JSON parse of JSON string representation stored in local storage as item "properties" - which is an array of arrays
function fetchCacheProperties(){
	let propertyCache = JSON.parse(localStorage.getItem("properties"));
	return propertyCache;
}