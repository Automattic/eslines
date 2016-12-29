const test = require( 'tape' );
const eslines = require( '../src/lib/eslines.js' );

// fixtures
const baseReport = require( './fixtures/eslint.json' );
const linesModifiedReport = require( './fixtures/eslint-lines-modified.json' );
const linesAndRulesReport = require( './fixtures/eslint-lines-and-rules.json' );
const parsingErrorsReport = require( './fixtures/eslint-parsing-errors.json' );

const lines = require( './fixtures/lines.json' );
const rulesNotToDowngrade = require( './fixtures/rules-not-to-downgrade.json' );

test( 'eslines - empty array if original report is empty', t => {
	const newReport = eslines( [], lines );

	// newReport should be [] as well
	t.ok( Array.isArray( newReport ) );
	t.equals( newReport.length, 0 );
	t.end();
} );

test( 'eslines - same report if lines parameter is empty', t => {
	const newReportWithEmptyParameters = eslines( baseReport, {}, [] );

	t.equals( JSON.stringify( newReportWithEmptyParameters ), JSON.stringify( baseReport ) );
	t.end();
} );

test( 'eslines - errors in files&lines not modified downgraded to warnings', t => {
	const newReport = eslines( baseReport, lines );

	// t.equals( JSON.stringify( newReport ), JSON.stringify( downgradedReport ) );
	t.equals( newReport[ 0 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 0 ].warningCount, linesModifiedReport[ 0 ].warningCount );
	t.equals( newReport[ 0 ].errorCount, linesModifiedReport[ 0 ].errorCount );
	t.equals( newReport[ 1 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 1 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 1 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 1 ].warningCount, linesModifiedReport[ 1 ].warningCount );
	t.equals( newReport[ 1 ].errorCount, linesModifiedReport[ 1 ].errorCount );
	t.equals( newReport[ 2 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 2 ].warningCount, linesModifiedReport[ 2 ].warningCount );
	t.equals( newReport[ 2 ].errorCount, linesModifiedReport[ 2 ].errorCount );
	t.equals( newReport[ 3 ].messages.length, 0 );
	t.equals( newReport[ 3 ].warningCount, linesModifiedReport[ 3 ].warningCount );
	t.equals( newReport[ 3 ].errorCount, linesModifiedReport[ 3 ].errorCount );
	t.equals( newReport[ 4 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 4 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 7 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 9 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 10 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 11 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 12 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 13 ].severity, 1 );
	t.equals( newReport[ 4 ].warningCount, linesModifiedReport[ 4 ].warningCount );
	t.equals( newReport[ 4 ].errorCount, linesModifiedReport[ 4 ].errorCount );
	t.equals( newReport[ 5 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 5 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 5 ].warningCount, linesModifiedReport[ 5 ].warningCount );
	t.equals( newReport[ 5 ].errorCount, linesModifiedReport[ 5 ].errorCount );
	t.equals( newReport[ 6 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 6 ].warningCount, linesModifiedReport[ 6 ].warningCount );
	t.equals( newReport[ 6 ].errorCount, linesModifiedReport[ 6 ].errorCount );
	t.equals( newReport[ 7 ].messages[ 0 ].severity, 1, '8th / 1st: file modified, line not' );
	t.equals( newReport[ 7 ].messages[ 1 ].severity, 2, '8th / 2nd: file & line modified' );
	t.equals( newReport[ 7 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 7 ].warningCount, linesModifiedReport[ 7 ].warningCount );
	t.equals( newReport[ 7 ].errorCount, linesModifiedReport[ 7 ].errorCount );
	t.equals( newReport[ 8 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 4 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 7 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 8 ].warningCount, linesModifiedReport[ 8 ].warningCount );
	t.equals( newReport[ 8 ].errorCount, linesModifiedReport[ 8 ].errorCount );
	t.end();
} );

// eslint-disable-next-line max-len
test( 'eslines - errors in files&lines not modified downgraded to warnings, except specific rules not to downgrade', t => {
	const newReport = eslines( baseReport, lines, rulesNotToDowngrade );

	// t.equals( JSON.stringify( newReport ), JSON.stringify( partiallyDowngradedReport ) );
	t.equals( newReport[ 0 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 0 ].warningCount, linesAndRulesReport[ 0 ].warningCount );
	t.equals( newReport[ 0 ].errorCount, linesAndRulesReport[ 0 ].errorCount );
	t.equals( newReport[ 1 ].messages[ 0 ].severity, 2, '2nd / 1st : do not downgrade max-len' );
	t.equals( newReport[ 1 ].messages[ 1 ].severity, 2, '2nd / 1st : do not downgrade max-len' );
	t.equals( newReport[ 1 ].messages[ 2 ].severity, 2, '2nd / 1st : do not downgrade max-len' );
	t.equals( newReport[ 1 ].warningCount, linesAndRulesReport[ 1 ].warningCount );
	t.equals( newReport[ 1 ].errorCount, linesAndRulesReport[ 1 ].errorCount );
	t.equals( newReport[ 2 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 2 ].warningCount, linesAndRulesReport[ 2 ].warningCount );
	t.equals( newReport[ 2 ].errorCount, linesAndRulesReport[ 2 ].errorCount );
	t.equals( newReport[ 3 ].messages.length, 0 );
	t.equals( newReport[ 3 ].warningCount, linesAndRulesReport[ 3 ].warningCount );
	t.equals( newReport[ 3 ].errorCount, linesAndRulesReport[ 3 ].errorCount );
	t.equals( newReport[ 4 ].messages[ 0 ].severity, 2, '5th / 1st : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 1 ].severity, 2, '5th / 2nd : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 2 ].severity, 2, '5th / 3rd : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 3 ].severity, 2, '5th / 4th : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 4 ].severity, 2, '5th / 5th : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 7 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 9 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 10 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 11 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 12 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 13 ].severity, 2, '5th / 14th : do not downgrade max-len' );
	t.equals( newReport[ 4 ].warningCount, linesAndRulesReport[ 4 ].warningCount );
	t.equals( newReport[ 4 ].errorCount, linesAndRulesReport[ 4 ].errorCount );
	t.equals( newReport[ 5 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 5 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 5 ].warningCount, linesAndRulesReport[ 5 ].warningCount );
	t.equals( newReport[ 5 ].errorCount, linesAndRulesReport[ 5 ].errorCount );
	t.equals( newReport[ 6 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 6 ].warningCount, linesAndRulesReport[ 6 ].warningCount );
	t.equals( newReport[ 6 ].errorCount, linesAndRulesReport[ 6 ].errorCount );
	t.equals( newReport[ 7 ].messages[ 0 ].severity, 1, '8th / 1st: file modified, line is not' );
	t.equals( newReport[ 7 ].messages[ 1 ].severity, 2, '8th / 2nd: file & line modified' );
	t.equals( newReport[ 7 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 7 ].warningCount, linesAndRulesReport[ 7 ].warningCount );
	t.equals( newReport[ 7 ].errorCount, linesAndRulesReport[ 7 ].errorCount );
	t.equals( newReport[ 8 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 4 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 7 ].severity, 2, '9th / 8th: do not downgrade max-len' );
	t.equals( newReport[ 8 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 8 ].warningCount, linesAndRulesReport[ 8 ].warningCount );
	t.equals( newReport[ 8 ].errorCount, linesAndRulesReport[ 8 ].errorCount );
	t.end();
} );

// eslint-disable-next-line max-len
test( 'eslines - errors in files&lines not modified downgraded to warnings, except specific rules not to downgrade (contains also parsing errors)', t => {
	// ESLint parsing errors have null as the ruleId
	// if we pass it in the array of rules to not downgrade, they would be detected
	const newReport = eslines( parsingErrorsReport, lines, rulesNotToDowngrade );

	// t.equals( JSON.stringify( newReport ), JSON.stringify( partiallyDowngradedReport ) );
	t.equals( newReport[ 0 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 0 ].warningCount, linesAndRulesReport[ 0 ].warningCount );
	t.equals( newReport[ 0 ].errorCount, linesAndRulesReport[ 0 ].errorCount );
	t.equals( newReport[ 1 ].messages[ 0 ].severity, 2, '2nd / 1st : do not downgrade max-len' );
	t.equals( newReport[ 1 ].messages[ 1 ].severity, 2, '2nd / 1st : do not downgrade max-len' );
	t.equals( newReport[ 1 ].messages[ 2 ].severity, 2, '2nd / 1st : do not downgrade max-len' );
	t.equals( newReport[ 1 ].warningCount, linesAndRulesReport[ 1 ].warningCount );
	t.equals( newReport[ 1 ].errorCount, linesAndRulesReport[ 1 ].errorCount );
	t.equals( newReport[ 2 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 2 ].warningCount, linesAndRulesReport[ 2 ].warningCount );
	t.equals( newReport[ 2 ].errorCount, linesAndRulesReport[ 2 ].errorCount );
	t.equals( newReport[ 3 ].messages.length, 0 );
	t.equals( newReport[ 3 ].warningCount, linesAndRulesReport[ 3 ].warningCount );
	t.equals( newReport[ 3 ].errorCount, linesAndRulesReport[ 3 ].errorCount );
	t.equals( newReport[ 4 ].messages[ 0 ].severity, 2, '5th / 1st : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 1 ].severity, 2, '5th / 2nd : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 2 ].severity, 2, '5th / 3rd : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 3 ].severity, 2, '5th / 4th : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 4 ].severity, 2, '5th / 5th : do not downgrade max-len' );
	t.equals( newReport[ 4 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 7 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 9 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 10 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 11 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 12 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 13 ].severity, 2, '5th / 14th : do not downgrade max-len' );
	t.equals( newReport[ 4 ].warningCount, linesAndRulesReport[ 4 ].warningCount );
	t.equals( newReport[ 4 ].errorCount, linesAndRulesReport[ 4 ].errorCount );
	t.equals( newReport[ 5 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 5 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 5 ].warningCount, linesAndRulesReport[ 5 ].warningCount );
	t.equals( newReport[ 5 ].errorCount, linesAndRulesReport[ 5 ].errorCount );
	t.equals( newReport[ 6 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 6 ].warningCount, linesAndRulesReport[ 6 ].warningCount );
	t.equals( newReport[ 6 ].errorCount, linesAndRulesReport[ 6 ].errorCount );
	t.equals( newReport[ 7 ].messages[ 0 ].severity, 2, '8th / 1st: parsing error report' );
	t.equals( newReport[ 7 ].warningCount, parsingErrorsReport[ 7 ].warningCount );
	t.equals( newReport[ 7 ].errorCount, parsingErrorsReport[ 7 ].errorCount );
	t.equals( newReport[ 8 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 4 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 7 ].severity, 2, '9th / 8th: do not downgrade max-len' );
	t.equals( newReport[ 8 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 8 ].warningCount, linesAndRulesReport[ 8 ].warningCount );
	t.equals( newReport[ 8 ].errorCount, linesAndRulesReport[ 8 ].errorCount );
	t.end();
} );
