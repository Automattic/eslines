/* eslint strict: "off" */

'use strict';

const fs = require( 'fs' );
const gitDiffRemoteVSHead = require( '../lib/git-diff' );
const gitDiffIndex = require( '../lib/git-diff-index' );

const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );

module.exports = function() {
	const whatToDiff = process.env.ESLINES_DIFF;

	let diff;
	if ( whatToDiff === 'index' ) {
		diff = gitDiffIndex();
	} else { // 'remote'
		diff = gitDiffRemoteVSHead( config.remote );
	}

	return diff;
};
