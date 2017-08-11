/* eslint strict: "off" */

'use strict';

const gitDiffRemoteVSHead = require( '../lib/git-diff' );
const gitDiffIndex = require( '../lib/git-diff-index' );

module.exports = function( remote ) {
	const whatToDiff = process.env.ESLINES_DIFF;

	let diff;
	if ( whatToDiff === 'index' ) {
		diff = gitDiffIndex();
	} else { // 'remote'
		diff = gitDiffRemoteVSHead( remote );
	}

	return diff;
};
