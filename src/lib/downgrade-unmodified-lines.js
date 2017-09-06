module.exports = function( report, lines, rulesNotToDowngrade ) {
	// deep clone the report, so we can create a new one
	// to tweak and edit in place - as this function remains pure.
	const newReport = JSON.parse( JSON.stringify( report ) );

	const isRuleNotToDowngrade = ( ruleId, rules ) => {
		if ( ! Array.isArray( rules ) ) {
			return false;
		}
		return rules.indexOf( ruleId ) > -1;
	};

	const isLineModified = ( line, whiteList ) => {
		// We expect the function to be passed the same files
		// within the ESLint report object and the lines object.
		// Nevertheless, if lines object does not contain a file
		// which the ESLint report object has, we set that line
		// as unmodifed - precaution principle.
		if ( ! whiteList ) {
			return false;
		}
		return whiteList.indexOf( line ) > -1;
	};

	const isMessageAnError = severity => {
		return severity === 2;
	};

	const getLinesModifiedInFile = ( linesModified, file ) => {
		if ( linesModified && linesModified.constructor === Object ) {
			return linesModified[ file ] || [];
		}
		return [];
	};

	// errors in lines not modified will be downgraded to warnings
	// except those rules set not to downgrade
	newReport.forEach( file => {
		const linesModifiedInFile = getLinesModifiedInFile( lines, file.filePath );
		file.messages.forEach( message => {
			if ( isMessageAnError( message.severity ) &&
				! isLineModified( message.line, linesModifiedInFile ) &&
				! isRuleNotToDowngrade( message.ruleId, rulesNotToDowngrade ) ) {
				message.severity = 1;
				file.warningCount++;
				file.errorCount--;
			}
		} );
	} );

	return newReport;
};
