const fs = require( 'fs' );
const eslines = require( '../lib/eslines' );
const differ = require( '../lib/differ' );
const gitDiffCalculator = require( '../lib/git-diff-calculator' );

const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );

module.exports = function( report ) {
	const lines = differ( gitDiffCalculator( config.remote ) );
	return JSON.stringify( eslines( report, lines, config.rulesNotToDowngrade ) );
};
