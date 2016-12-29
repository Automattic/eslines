const test = require( 'tape' );
const parsingErrors = require( '../src/lib/parsing-errors.js' );

// fixtures
const reportWithParsingError = require( './fixtures/eslint-parsing-errors.json' );
const reportWithoutParsingErrors = require( './fixtures/eslint.json' );

test( 'parsing-errors - returns empty report for reports without parsing errors', t => {
	const newReport = parsingErrors( reportWithoutParsingErrors );
	t.equals( newReport.length, 0 );

	t.end();
} );

test( 'parsing errors - returns report containing only files with parsing errors', t => {
	const newReport = parsingErrors( reportWithParsingError );
	t.equals( newReport.length, 1 );

	t.end();
} );
