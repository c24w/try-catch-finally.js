define(function defineObjectChecker() {

	String.prototype.__toObject__ =
	Number.prototype.__toObject__ =
	Boolean.prototype.__toObject__ =
	function () { return this; };

	function isConvertablePrimitive(obj) {
		return obj !== undefined
			&& obj !== null
			&& typeof obj.__toObject__ === 'function';
	}

	function ObjectChecker(subject) { this.subject = subject; }

	ObjectChecker.prototype.valueEquals = function valueEquals(value) {
		return this.subject === value;
	};

	ObjectChecker.prototype.nameEquals = function nameEquals(name) {

		var nameMatchPattern, subjectClassProperty;

		if (typeof name !== 'string') return false;

		nameMatchPattern = new RegExp('^\\[object ' + name + '\\]$');

		subjectClassProperty = Object.prototype.toString.call(this.subject);

		return nameMatchPattern.test(subjectClassProperty);
	};

	ObjectChecker.prototype.instanceOf = function instanceOf(constructor) {

		var subject = this.subject,
			subjectAsObject = isConvertablePrimitive(subject) ? subject.__toObject__() : subject;

		return (typeof constructor === 'function') && (subjectAsObject instanceof constructor);
	};

	return ObjectChecker;

});
