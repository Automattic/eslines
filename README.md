# eslines

`eslines` helps you to post-process an ESLint JSON report.

The default behavior is transforming all errors into warnings, except 1) those reported in lines modified within the current git branch and 2) any `no-unused-vars` ESLint rule break.

## How to use it

Install it:

	npm install eslines

Add the default `.eslines.json` config file to your git repo:

    {
        "branches": {
	        "default": ["lines-modified", "enforce"]
        },
        "processors": {
            "lines-modified": {
                "remote": "origin/master",
            },
            "enforce": {
                "rules": ["no-unused-vars"],
            }
        }
    }

Run it:

	eslint -f json . | eslines

## Config file

`eslines` reads its configuration from a file named `.eslines.json` placed in the root of your git repository. Out of the box, it comes with three ways of post-processing an ESLint report - we call them *processors*.

The processor `lines-modified` will transform ESLint `errors` into `warnings`, except for errors that are in lines modified in the current branch. The processor `parsing-errors` takes the ESLint report and outputs a new one containing only `Parsing Errors`. The processor `enforce` will transform any `warning` into an `error`. Processors are composable.

For example:

	{
		"branches": {
			"default": ["lines-modified", "enforce"],
			"master": ["parsing-errors"],
			"my/topic-branch": ["parsing-errors"],
		},
		"processors": {
			"lines-modified": {
				"remote": "origin/master",
			},
			"enforce": {
				"rules": ["no-unused-vars"],
			}
		}
	}

With the above configuration, the linting process will report only `parsing-errors` when running on a git branch called `master` or `my/topic-branch`. For any other branch, it will report only errors in lines modified in the current branch and any `no-unused-vars` break, no matter where it happened.

* **branches**: tell `eslines` which processors to use by default and which ones to use for particular branches. By default, it'll use `lines-modified` first, and then `enforce`.

* **processors.['lines-modified'].remote**: lines modified are determined by diffing this remote git branch against the current branch.

* **processors.enforce.rules**: an array containing valid [ESLint rule ids](http://eslint.org/docs/rules/). Any rule declared in this array will be transformed into `errors`.

## Runtime options

The `eslines` Command Line Interface has the following options:

* **--processor** or **-p**: choose an `eslines` processor at run-time. `lines-modified` and `enforce` will be used by default. Admites composition by separating the processors with commas `--processor lines-modified,enforce`.

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
