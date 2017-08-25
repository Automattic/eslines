const fs = require( 'fs' );
const downgradeUnmodifiedLines = require( '../lib/downgrade-unmodified-lines' );
const differ = require( '../lib/differ' );
const gitDiffCalculator = require( '../lib/git-diff-calculator' );

const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );

module.exports = function( report ) {
	const processorConfig = config.processors[ 'downgrade-unmodified-lines' ] || {};
	const remote = processorConfig.remote || 'origin/master';
	const whatToDiff = process.env.ESLINES_DIFF;
	const lines = differ( gitDiffCalculator( remote, whatToDiff ) );

	const rulesNotToDowngrade = processorConfig.rulesNotToDowngrade || [];
	return JSON.stringify( downgradeUnmodifiedLines( report, lines, rulesNotToDowngrade ) );
};
