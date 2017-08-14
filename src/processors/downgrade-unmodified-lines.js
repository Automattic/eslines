const fs = require( 'fs' );
const downgradeUnmodifiedLines = require( '../lib/downgrade-unmodified-lines' );
const differ = require( '../lib/differ' );
const gitDiffCalculator = require( '../lib/git-diff-calculator' );

const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );

module.exports = function( report ) {
	const remote = config.processors[ 'downgrade-unmodified-lines' ].remote || 'origin/master';
	const lines = differ( gitDiffCalculator( remote ) );
	return JSON.stringify( downgradeUnmodifiedLines( report, lines ) );
};
