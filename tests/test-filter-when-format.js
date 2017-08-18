const test = require( 'tape' );
const filterWhenFormat = require( '../src/lib/filter-when-format.js' );

// fixtures
const report = require( './fixtures/eslint-with-format.json' );

test( 'filter-when-format - removes style errors from the report if @format is present', t => {
	const newReport = filterWhenFormat( [ report[ 0 ] ], [ 'indent' ] );
	t.equals( newReport.length, 1 );
	t.equals( newReport[ 0 ].messages.length, 1 );
	t.equals( newReport[ 0 ].messages[ 0 ].ruleId, 'no-unused-vars' );

	t.end();
} );

test( 'filter-when-format - keeps style errors in the report if @format is not present', t => {
	const newReport = filterWhenFormat( [ report[ 1 ] ], [ 'indent' ] );
	t.equals( newReport.length, 1 );
	t.equals( newReport[ 0 ].messages.length, 2 );
	t.equals( newReport[ 0 ].messages[ 0 ].ruleId, 'indent' );
	t.equals( newReport[ 0 ].messages[ 1 ].ruleId, 'no-unused-vars' );

	t.end();
} );
