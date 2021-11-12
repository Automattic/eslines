# Release

Release tasks:

* `npm run lint` - fix any linting issues.
* `npm run test` - fix any failing tests.
* Bump `package.json` version.
* Review that `Changelog.md` includes the relevant changes, update version and log diff link, create a new section for the next version.
* Create a new git tag and push it to github.
* Push a new version to npm.
