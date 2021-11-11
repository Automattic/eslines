/* eslint-disable strict */

'use strict';

const { resolve } = require( 'path' );
const { ESLint } = require( 'eslint' );

/**
 * @param {string} format Formatter to load
 * @returns {Promise<ESLint.Formatter['format']>} ESLint formatter
 */
async function loadFormatter( format ) {
	const eslint = new ESLint();

	try {
		const formatter = await eslint.loadFormatter( format );
		return formatter.format;
	} catch ( ex ) {
		const msg = 'Problem loading formatter: ' + format + '\nError: ';
		ex.message = msg + ex.message;
		throw ex;
	}
}

/**
 * @param {string} format Formatter to load
 * @returns {Promise<ESLint.Formatter['format']>} ESLint formatter
 */
async function loadFormatterESLint6( format ) {
	let formatterPath;

	// replace \ with / for Windows compatibility
	format = format.replace( /\\/g, '/' );

	// if there's a slash, then it's a file
	if ( format.indexOf( '/' ) > -1 ) {
		formatterPath = resolve( process.cwd(), format );
	} else {
		formatterPath = 'eslint/lib/cli-engine/formatters/' + format;
	}

	try {
		return require( formatterPath );
	} catch ( ex ) {
		const msg = 'Problem loading formatter: ' + formatterPath + '\nError: ';
		ex.message = msg + ex.message;
		throw ex;
	}
}

module.exports = format => {
	// default is stylish
	format = format || 'stylish';

	// only strings are valid formatters
	if ( typeof format === 'string' ) {
		return ( typeof ESLint !== 'undefined' )
			? loadFormatter( format )
			: loadFormatterESLint6( format );
	}

	return null;
};
