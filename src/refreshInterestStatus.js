// Refresh on back button - so if property is an interest and is removed, upon return, webpage will show
// accurate representation of if property is contained within the interests list.
window.addEventListener( "pageshow", function ( event ) {
	var historyTraversal = event.persisted || 
						   ( typeof window.performance != "undefined" && 
								window.performance.navigation.type === 2 );
	if ( historyTraversal ) {
	  // Handle page restore.
	  window.location.reload();
	}
  });