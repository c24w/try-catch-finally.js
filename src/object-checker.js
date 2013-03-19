define(function defineObjectChecker() {

	String.prototype.__coerceToObject__ =
	Number.prototype.__coerceToObject__ =
	Boolean.prototype.__coerceToObject__ =
	function __coerceToObject__() { return this; };

	function canCoerceToObject(obj) {
		return obj !== undefined
			&& obj !== null
			&& typeof obj.__coerceToObject__ === 'function';
	}

	function ObjectChecker(subject) { this.subject = subject; }

	ObjectChecker.prototype.valueEquals = function valueEquals(value) {
		return this.subject === value;
	};

	ObjectChecker.prototype.nameEquals = function nameEquals(name) {

		var nameMatchPattern, errorAsString;

		if (typeof name !== 'string') return false;

		nameMatchPattern = new RegExp('^\\[object ' + name + '\\]$');

		errorAsString = Object.prototype.toString.call(this.subject);

		return nameMatchPattern.test(errorAsString);
	};

	ObjectChecker.prototype.instanceOf = function instanceOf(constructor) {

		var subject = this.subject,
			subjectAsObject = canCoerceToObject(subject) ? subject.__coerceToObject__() : subject;

		return (typeof constructor === 'function') && (subjectAsObject instanceof constructor);
	};

	return ObjectChecker;

});