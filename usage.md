# Usage

	c24w.try( Function tryBlock )
		[ .catch( [ Object error, ] Function catchCallback ) ]*
		[ .finally( Function finallyCallback ) ];
  
`Function` `tryBlock` - code to execute inside the try block.

`Object` `error` - error to catch; catches all errors if not defined.

`Function` `catchCallback` - executed if the defined error (if any) is caught, with the caught error as the only argument.

`Function` `finallyCallback` - always executed after the try/catch, irrespective of any handled exceptions.

Note: as with normal try/catch behaviour, the most specific error to be caught must appear first.