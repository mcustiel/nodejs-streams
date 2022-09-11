# Node.js streams example

Provides an HTTP server proxying to github to search the top rated repositories.
The code tries to be clean, SOLID and use some common design patterns.

## Query string:

It receivs the following parameters in the query string:

* page (number; default = 1)
* count (number: default = 10 or the value provided in the env var: DEFAULT_COUNT_PER_PAGE)
* language: (string; optional) display repositories only for that language
* createdFrom: (string; optional; format: yyyy-mm-dd) display repositories created from the given date

## Environment variables to override configuration:

* PORT (number, default: 8080) sets the http port where the server listens
* DEFAULT_COUNT_PER_PAGE (number, default: 10) sets the default count per page to display in the response

## Tests:

There are some unit tests as an example of how the streams can be tested. Also there's one integration test.

There's still the need to add automated acceptance test by mocking the calls to github.

## Run:

### Server:

```
npm i && npm run serve
```

Then execute a request (there's no specific endpoint):

```
http://localhost:8080/?language=php&page=1&count=50&createdFrom=2022-01-01
```

### Tests:

```
npm run tests
```
