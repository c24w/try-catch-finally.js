# `try-catch-finally.js`

[![Build](https://img.shields.io/github/workflow/status/c24w/try-catch-finally.js/Test?style=flat-square)](https://github.com/c24w/try-catch-finally.js/actions)
[![Coverage](https://img.shields.io/coveralls/c24w/try-catch-finally.js.svg?style=flat-square)](https://coveralls.io/github/c24w/try-catch-finally.js 'Coverage')
[![Dependencies](https://img.shields.io/david/c24w/try-catch-finally.js.svg?style=flat-square)](https://david-dm.org/c24w/try-catch-finally.js 'Dependencies')
[![npm](https://img.shields.io/npm/v/try-catch-finally.svg?style=flat-square)](https://www.npmjs.com/package/try-catch-finally 'npm')
[![Stars](https://img.shields.io/github/stars/c24w/try-catch-finally.js.svg?style=flat-square)](https://github.com/c24w/try-catch-finally.js/stargazers 'Stars')

[](size)843 byte[](size) library for more flexible error catching in JavaScript.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Installation](#installation)
  - [Browser](#browser)
  - [AMD](#amd)
  - [Node](#node)
- [Usage](#usage)
  - [API](#api)
  - [Examples](#examples)
- [Caveats](#caveats)
  - [Catch-by-name may not work](#catch-by-name-may-not-work)
  - [Catch-by-type won't work across frames/processes](#catch-by-type-wont-work-across-framesprocesses)
  - [Errors are consumed](#errors-are-consumed)
- [Tests](#tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

### Browser

```html
<script src="try-catch-finally.js"></script>
```
```javascript
console.log(typeof window.try) // -> function
console.log(typeof window._try) // -> function
```

### AMD

```javascript
define(['try-catch-finally'], function (_try) {
  console.log(typeof _try); // -> function
});
```

### Node

```shell
npm install --save try-catch-finally
```
```javascript
var _try = require('try-catch-finally');
console.log(typeof _try); // -> function
```

## Usage

### API

#### \_try ( _tryBlock_ )
* _**tryBlock**_ `<function>` - code which may throw errors

#### .catch ( [ _error_, ] _handleError_ )
* _**error**_ `<any>` - (optional) error to catch
* _**handleError**_ `<function>` - handle errors which correspond to _**error**_ (if defined); else handle any error

#### .finally ( _finallyBlock_ )
* _**finallyBlock**_ `<function>` - code which will always exectue

### Examples

#### Catch anything
```javascript
_try(function () {
  throw new Error('boom');
})
.catch(function (e) {
  console.log('Caught', e);
});
```

#### Catch-by-value
```javascript
_try(function () {
  throw 12345;
})
.catch(12345, function (e) {
  console.log('Caught', e);
});
```
Error value matches by strict equality (`===`).

#### Catch-by-name
```javascript
_try(function () {
  throw { error: 'boom' };
})
.catch('object', function (e) {
  console.log('Caught', e);
});
```
Error name matches similarly to `typeof`, with the bonus that it:
- is case-insensitive
- works for boxed primitives (e.g. `new String()`)

#### Catch-by-type
```javascript
_try(function () {
  throw 'boom';
})
.catch(Object, function (e) {
  console.log('Caught', e);
});

_try(function () {
  throw new TypeError('boom');
})
.catch(Error, function (e) {
  console.log('Caught', e);
});
```
Error type matches similarly to `instanceof`, with the bonus that it works for literal primitives (`'hello'`, `123`, etc).

## Caveats

### Catch-by-name may not work
It's not always possible to get the name of an object in JavaScript, such as for objects created using non-native constructors:
```javascript
function CustomError() {}

_try(function () {
  throw new CustomError();
})
.catch('CustomError', function (e) {
  console.log('Caught', e);
});
```
Or for some native objects which use inheritance:
```javascript
_try(function () {
  throw new TypeError();
})
.catch('TypeError', function (e) {
  console.log('Caught', e);
});
```
Those catch blocks won't execute. The best this library can do is find out that:
- the `new CustomError()` is some kind of `object`, but not specifically a `CustomError` by name
- the `new TypeError()` is some kind of `Error`, but not specifically a `TypeError` by name

It's best to use the catch-by-type style in those cases.

### Catch-by-type won't work across frames/processes
This quirk exists in the native `instanceof` (which fails across browser frames and node processes) when the instance's constructor differs to the one passed to `instanceof`. It's best to use the catch-by-name in those cases.

### Errors are consumed
Any error thrown synchronously in the try block is consumed by this library.  There are two ways to ensure errors which aren't caught/handled by any `catch` don't disappear:

#### Use an indiscriminate catch block
```javascript
_try(function () {
  throw new Error('boom');
})
.catch(String, function (e) {
  console.log('Caught String', e);
})
.catch(function (e) {
  console.log('Caught other', e);
});
```
The first catch block won't execute and the second ensures other errors don't go unhandled.

#### Use a finally block
```javascript
_try(function () {
  throw new Error('boom');
})
.catch(String, function (e) {
  console.log('Caught', e);
})
.finally();
```
That catch block won't execute and the finally call ensures any caught error is re-thrown.

## Tests
The following tests are continually run in TravisCI:

|            | Node (v0.12, 4, 6, 8, 10, 12) | Chrome Headless (global) | Chrome Headless (AMD) |
|:----------:|:-----------------------------:|:------------------------:|:---------------------:|
| unminified |            &#9745;            |          &#9745;         |         &#9745;       |
|  minified  |            &#9745;            |          &#9745;         |         &#9745;       |

The tests can be run in any browsers supported by Karma. See the npm scripts and travis configuration for more details.