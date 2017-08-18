# Release

Release tasks:

* `npm run lint` - fix any linting issues.
* `npm run test` - fix any failing tests.
* Test that it works with (or prepare the necessary changes to make it work with):
    * [eslint-eslines](https://github.com/Automattic/eslint-eslines)
    * major contributors: [wp-calypso](https://github.com/Automattic/wp-calypso), Happychat ([service](https://github.com/Automattic/happychat-service) et al.)
* Bump `package.json` version.
* Review that `Changelog.md` includes the relevant changes, update version and log diff link, create a new section for the next version.
* Create a new git tag and push it to github.
* Push a new version to npm.

## Testing in Calypso before releasing

Update `.eslines.json` config as appropiate.

Update `package.json` such as eslines and eslint-eslines packages require the eslines `master` to be released:

    "eslines": "Automattic/eslines#master"
    "eslint-eslines": "Automattic/eslint-eslines#test/eslines-master"

Update package and shrinkwrap:

    cd <wp-calypso>
    npm run update-deps
    git add package.json npm-shrinkwrap.json
    git commit -m 'Update deps'

**Test that pre-commit hook prevents you from commiting and CircleCI reports the linting error**

    git checkout master
    git checkout -b test/eslines-fail

Open `client/components/web-preview/index.jsx` and remove the spaces after and before the parens at line 22. Do not introduce any other change.

    git add client/components/web-preview/index.jsx
    git commit -m 'pre-commit hook should prevent from commiting'

Expected result is that commit hook will report an error in the line modified and won't let you commit (notice that the same error in lines not modified is considered a warning).

Let's check CircleCI now:

    git commit --no-verify -m 'CircleCI should report the linting errors'
    git push <origin> test/eslines-fail:test/eslines-fail

Expected result is that CircleCI will report a linting error in the line modified (notice that the same error in lines not modified is considered a warning).

**Test that pre-commit hook lets you commit and CircleCI reports no linting errors**

    git checkout master
    git checkout -b test/eslines-pass

Open `client/components/web-preview/content.jsx` and remove all debug statements and the debug importing. Do not introduce any other change.

    git add client/components/web-preview/content.jsx
    git commit -m 'pre-commit hook should allow commiting'

Expected result is that commit hook won't prevent you from commiting.

Let's check CircleCI:

    git push <origin> test/eslines-pass:test/eslines-pass

Expected result is that CircleCI won't report any error.
