http://stackoverflow.com/questions/1433558/handling-specific-errors-in-javascript-think-exceptions/14385064#14385064

	// catchMany = true/false to decide whether errorHandled is set or not - false by default
	// e.g. try(fnThrowsError).catch(Object).catch(Error).catch(String) - first two catches would be entered
	// useful feature?
	
	.catch('String', function(e) {
		// catch using constrcutor names as well as constructor function
		//  -> will only catch explicitly, e.g. catch('Object') will not catch everything like catch(Object)
	});