# eslines

`eslines` processes an ESLint JSON report and downgrades errors to warnings, except for those reported in lines modified within the current git branch.

## How to use it

Install it:

	npm install eslines

Add the default `.eslines.json` config file in you git repo:

	{
		"rulesNotToDowngrade": [],
		"remote": "origin/master",
		"processors": {
			"default": "lines-modified"
		}
	}

Run it:

	eslint -f json . | eslines

## Config file

`eslines` reads its configuration from a file named `.eslines.json` placed in the root of your git repository.

`eslines` has two ways of processing an ESLint report, we call them processors. The processor `lines-modified` will downgrade ESLint `errors` to `warnings`, except for lines modified in the current branch. The processor `parsing-errors` takes the ESLint report and outputs a new one containing only `Parsing Errors`.

Options:

* **rulesNotToDowngrade**: an array containing valid [ESLint rule ids](http://eslint.org/docs/rules/). For any rule declared in this array, the `lines-modified` processor won't downgrade to `warnings` reported `errors` for these rules, no matter whether the line was modified or not.

* **remote**: lines modified are determined by diffing this remote git branch against the current branch.

* **processors**: `eslines` will choose the processor to use by default and which one to use for particular branches looking at this object.

For example:

	{
		"rulesNotToDowngrade": [],
		"remote": "origin/master",
		"processors": {
			"default": "lines-modified",
			"master": "parsing-errors",
			"my/topic-branch"
		}
	}

With the above configuration, `eslines` will report only `parsing-errors` when running on a git branch called `master` or `my/topic-branch`. For any other branch, it will use the `lines-modified` processor.

## Runtime options

The `eslines` Command Line Interface has the following options:

* **--processor** or **-p**: choose an `eslines` processor at run-time. `lines-modified` will be used by default.

* **--format** or **-f**: set any of ESLint default formatters as the output for `eslines`. `stylish` will be used by default.

* **--diff** or **-d**: let you choose between two diff strategies:

	* `index`: to diff HEAD against the git index.
	* `remote`: to diff HEAD against the git remote. This is the default.

Some examples:

to get a report with `junit` format containing only the parsing errors

	eslint -f json . | eslines -p parsing-errors -f junit

to get a report containing errors in lines modified within files at the git index

	eslint -f json . | eslines -d index
