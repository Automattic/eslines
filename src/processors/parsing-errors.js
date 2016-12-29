const parsingErrors = require( '../lib/parsing-errors' );

module.exports = function( report ) {
	return JSON.stringify( parsingErrors( report ) );
};
