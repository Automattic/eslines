const fs = require( 'fs' );
const enforce = require( '../lib/enforce' );

const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );

module.exports = function( report ) {
	return JSON.stringify( enforce( report, config.processors.enforce.rules ) );
};
