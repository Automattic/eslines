const docblock = require( 'jest-docblock' );

function fileHasFormatPragma( file ) {
	return file.source && 'format' in docblock.parse( file.source );
}

// If the file has the @format pragma at the beginning, it means it was formatted with
// Prettier and that specified ESlint style rules should be ignored -- they sometimes
// have a different opinion about the formatting, but Prettier is the authority.
module.exports = function filterWhenFormat( report, rulesToIgnore ) {
	if ( ! Array.isArray( rulesToIgnore ) || rulesToIgnore.length === 0 ) {
		return report;
	}

	const filtered = report.map( file => {
		if ( ! fileHasFormatPragma( file ) ) {
			return file;
		}

		let { warningCount, errorCount } = file;

		const messages = file.messages.filter( message => {
			const shouldRemove = rulesToIgnore.includes( message.ruleId );

			if ( shouldRemove ) {
				if ( message.severity === 1 ) {
					warningCount--;
				} else if ( message.severity === 2 ) {
					errorCount--;
				}
			}

			return ! shouldRemove;
		} );

		if ( messages.length === 0 ) {
			return null;
		}

		return Object.assign( {}, file, { messages, warningCount, errorCount } );
	} );

	return filtered.filter( Boolean ); // remove the null entries
};
