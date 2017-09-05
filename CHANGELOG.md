# Changelog

## Next version
[v1.1.0...master](https://github.com/Automattic/eslines/compare/v1.0.0...master)

## 2017-09-05 v1.1.0
[v1.0.0...v1.1.0](https://github.com/Automattic/eslines/compare/v1.0.0...v1.1.0)

* Fixed `downgrade-unmodified-lines` processor: when there are no lines modified,
  the report should still downgrade all rules except those not to downgrade.

## 2017-08-28 - v1.0.0
[v0.0.13...v1.0.0](https://github.com/Automattic/eslines/compare/v0.0.13...v1.0.0)

* Added composable processors.
* Added new processor called `enforce` that transforms warnings into errors.
* Updated config format.
* Updated docs.
* Updated error handling.
* Renamed `processor` CLI option to `processors`.
* Renamed `parsing-errors` processor to `filter-parsing-errors`.
* Renamed `lines-modified` to `downgrade-unmodified-lines`.

## 2017-04-06 - v0.0.13
[v0.0.12...v0.0.13](https://github.com/Automattic/eslines/compare/v0.0.12...v0.0.13)

* Added `--quiet` CLI option to report errors only.

## 2017-03-24 - v0.0.12
[v0.0.11...v0.0.12](https://github.com/Automattic/eslines/compare/v0.0.11...v0.0.12)

* Use strict mode to support block-scoped declarations.

## 2017-03-23 - v0.0.11
[v0.0.10...v0.0.11](https://github.com/Automattic/eslines/compare/v0.0.10...v0.0.11)

* Fixed streaming data.

## 2017-03-21 - v0.0.10
[v0.0.9...v0.0.10](https://github.com/Automattic/eslines/compare/v0.0.9...v0.0.10)

* Updated README.

## 2016-12-29 - v0.0.9

* Updated README.
