$(document).on("pagecreate", function(){    
    // when user pressed register interest, the button is hidden and the user is shown the existing interest label
    // the interest is then saved to local storage, using the property title and respective url as arguments in setStorage function
    // popup is then shown to the user confirming property being saved to interests.
	$("#register-interest-button").click(function(){
        // if browser supports local storage, below occurs, otherwise user is notified local storage is not supported
		if ((typeof(Storage)) != "undefined") {
            $("#register-interest-button").hide();
            document.getElementById("registered-interest-text").style.visibility = "visible";
            setStorage(getTitle(), getUrl());
            $("#interestPopup").popup("open");
		}
		else{
            $("#unsupported").text("This browser does not support local storage. Please update or use another browser.");
        }
    });
    // when property page is created, if item "properties" is contained in local storage and is null / equal to []; item is deleted from local storage
    // alternatively  if item "properties" is contained in local storage and is not null, each saved property is checked against current property page
    // if a match is found, the page adjusts by hiding the add to propety page button and making the user aware the property is an existing intrest
	if ("properties" in localStorage){
        if (localStorage.getItem("properties") === "[]")
        {
            localStorage.removeItem("properties");
            return;
        }
        propertyDetails = JSON.parse(localStorage.getItem("properties"));
        for (var property of propertyDetails) 
        {
            if (property.name === getTitle()){
                $("#register-interest-button").hide();
                document.getElementById("registered-interest-text").style.visibility = "visible";
                document.getElementById("registered-interest-text").style.fontSize = "20px";
            }
        }
    }
});

// getTitle function used for checking if current property is contained as key in properties item & for storing new registered interests
function getTitle() {
	let title = $("#propertyTitle").text();
	return title;
}

// getUrl function used for storing new registered interests to local storage
function getUrl(){
	let title = $("#propertyTitle").text();
	let url = title.replace(/\s+/g, '').toLowerCase();
	return url;
}

// setStorage appends arguments property title and property url to local storage item properties
function setStorage(title, url){
    // if properties is null or empty, property item is defined as list of lists containing only current property
    // else, localstorage item properties is parsed as JSON and for each item in JSON var, if property.name key == page property title,
    //       it is assumed the property is already an interest and the function returns
    //       otherwise, new property is defined as the current property title and page url which is then pushed into the existing properties item
    //       changes, are then saved to local interest.
    //
    //Below is an example of local storage 'properties' item containing mulitple properties
    // [
    //      {name (key) : property title (attribute), propertyurl (key) : property_url (attribute)},
    //      {name (key) : property title2 (attribute), propertyurl (key) : property_url2 (attribute)}
    // ]
    if (localStorage.getItem("properties") === null || localStorage.getItem("properties") === "[]")
    {
        var property = [
            {name: title, propertyurl: url}
        ];
        localStorage.setItem("properties", JSON.stringify(property));
    }
    else
    {
        var properties = JSON.parse(localStorage.getItem("properties"));
        for (var property of properties){
            if (property.name === getTitle()){return;}
        }
        var newProperty = {name: title, propertyurl: url};
        properties.push(newProperty);
        localStorage.setItem("properties", JSON.stringify(properties));
    }
}

// function respondsible for removing interest when user clicks "Remove *insert property name*" in registered interests page
function removeInterest(element){
    // element is defined as substring where "Remove " is removed from "Remove *insert property name*", leaving only the property name
    element = element.textContent.replace("Remove ", "");
    properties = JSON.parse(localStorage.getItem("properties"));
    // For each element in JSON parsed local storage item 'properties', if name key attribute is equal to element defined above, the property is deleted
    for (var i = 0; i < properties.length; i++) 
    {
        if (properties[i].name === element)
        {
            delete properties[i];
        }
    }
    // the adjusted properties item is then turned into string, removing any null characters or ',' characters with no following element - to maintain data integrity,
    // the item is then saved again to local storage and the page is reloaded to reflect removed property to user
    localStorage.setItem("properties", JSON.stringify(properties,  (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v, 2 ));
    location.reload();

}