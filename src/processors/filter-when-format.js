const fs = require( 'fs' );
const filterWhenFormat = require( '../lib/filter-when-format' );

const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );

module.exports = function( report ) {
	const processorConfig = config.processors[ 'filter-when-format' ] || {};
	const rulesToIgnore = processorConfig.rulesToIgnore || [];
	return JSON.stringify( filterWhenFormat( report, rulesToIgnore ) );
};
