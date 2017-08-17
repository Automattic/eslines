# eslines

`eslines` helps you to post-process an ESLint JSON report.

## History

Originally, the project was created to downgrade errors into warnings if they were reported in lines not modified within the current git branch - hence the name.

This approach helped us to set all our ESLint rules to errors without the need to immediately fix all the linting errors in our codebase. Our linting tools (pre-commit hooks, continuous integration, etc) only reported errors in lines that were modified by a branch. All new code needed to adhere to the current linting standards, but legacy code could be migrated gradually - helping to evolve the linting standards as well.

Nowadays, it has grown to support more options than that.

## How to use it

Install it:

	npm install eslines

Add the default `.eslines.json` config file to your git repo:

    {
        "branches": {
            "default": ["downgrade-unmodified-lines"]
        },
        "processors": {
            "downgrade-unmodified-lines": {
                "remote": "origin/master",
                "rulesNotToDowngrade": ["no-unused-vars"]
            }
        }
    }

Run it:

	eslint -f json . | eslines

## Config file

`eslines` reads its configuration from a file named `.eslines.json` placed in the root of your git repository. Out of the box, it comes with three ways of post-processing an ESLint report - we call them *processors*.

* `downgrade-unmodified-lines` will transform ESLint `errors` into `warnings` if they are reported in lines not modified within the current branch. It is possible to prevent some rules from being downgraded. We recommend doing this for the `no-unused-vars` rule because this is one case where changing one line can cause a linting error in another.
* `parsing-errors` takes the ESLint report and outputs a new one containing only `Parsing Errors`.
* `enforce` will transform `warnings` into `errors` for a subset of rules.

For example:

	{
		"branches": {
			"default": ["downgrade-unmodified-lines", "enforce"],
			"master": ["parsing-errors"],
			"my/topic-branch": ["parsing-errors"]
		},
		"processors": {
			"downgrade-unmodified-lines": {
				"remote": "origin/master",
				"rulesNotToDowngrade": ["no-unused-vars"]
			},
			"enforce": {
				"rules": ["max-len"]
			}
		}
	}

With the above configuration, the linting process will report only `parsing-errors` when running on a git branch called `master` or `my/topic-branch`. For other branches, eslines will report any `max-len` or `no-unused-vars` break, plus any error in lines modified within the current branch (provided that `no-unused-vars` is defined as an error in ESLint).

* **branches**: tell `eslines` which processors to use by default and which ones to use for particular branches. If none is set, it'll use `downgrade-unmodified-lines`.

* **processors.['downgrade-unmodified-lines'].remote**: lines modified are determined by diffing this remote git branch against the current branch.

* **processors.['downgrade-unmodified-lines'].rulesNotToDowngrade**: an array containing valid [ESLint rule ids](http://eslint.org/docs/rules/). Any rule declared in this array won't be downgraded to  `warning`. If the rule is declared as a `warning` it won't be transformed into an `error` either - if that's your goal you may want to use the `enforce` processor.

* **processors.['enforce'].rules**: an array containing valid [ESLint rule ids](http://eslint.org/docs/rules/). Any rule declared in this array will be transformed into an `error`.

## Runtime options

The `eslines` Command Line Interface has the following options:

* **--processors** or **-p**: choose one or several `eslines` processors at run-time. `downgrade-unmodified-lines` will be used by default. Processors can be composed by separating them with commas such as `--processors downgrade-unmodified-lines,enforce`.

* **--format** or **-f**: set any of ESLint default formatters as the output for `eslines`. `stylish` will be used by default.

* **--diff** or **-d**: let you choose between two diff strategies:

	* `index`: to diff HEAD against the git index.
	* `remote`: to diff HEAD against the git remote. This is the default.

* **--quiet**: report errors only.

Some examples:

to get a report with `junit` format containing only the parsing errors

	eslint -f json . | eslines -p parsing-errors -f junit

to get a report containing errors in lines modified within files at the git index

	eslint -f json . | eslines -d index


## How to contribute

See [HACKING.md](HACKING.md)
