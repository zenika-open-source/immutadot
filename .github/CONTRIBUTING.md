# Contributing to immutad●t
First of all thank you for the interest you show in immutad●t ! :+1:<br />
We are very happy to welcome new contributors. :tada:

## How can I contribute ? :man_technology:
### Report a bug :bug:
If you think you have found a bug, please search [our issue tracker](https://github.com/Zenika/immutadot/issues) to see if anyone has already reported it.<br />
If you are the first to have noticed it, please [create an issue](https://github.com/Zenika/immutadot/issues/new), and make sure to provide any information that might help us resolve it.<br />
You are welcome to try and fix it by submitting a pull request if you would like to (see Pull requests section for more information).

### Feature requests and enhancements :sparkles:
We are open to feature requests, be sure to search [our issue tracker](https://github.com/Zenika/immutadot/issues) to see if anyone has already asked for it.<br />
If not, please [create an issue](https://github.com/Zenika/immutadot/issues/new) describing what you want, what is your use case, and an example of code.<br />
You are welcome to try and do it yourself by submitting a pull request if you would like to (see Pull requests section for more information).<br />
As immutad●t is still a very young project, we are also open to enhancement suggestions ; if you think of anything that might help us improve the project, please [create an issue](https://github.com/Zenika/immutadot/issues/new), and we will be happy to discuss it with you.

### Pull requests :arrow_up:
#### Installation :package:
We use [yarn](https://yarnpkg.com/) but you are free to use [npm](https://www.npmjs.com/) if you prefer.<br />
Once you have cloned the project, run `yarn` or `npm install` to install all the dependencies.

#### Architecture :house:
We have only one peer dependency on [lodash](https://lodash.com/) and we intend to keep it that way.<br />
immutad●t is organized in namespaces (array, collection, lang, etc.), a lot like lodash, please try to respect this organization ; if you are not sure where to put your code, ask for the right place in your issue or PR.

#### Tests and Code style :policeman:
I you write any code, be sure to write the test going with it in a file located at the same place and named `<something>.spec.js` ; we have a coverage of a :100: percent and we would like to keep it :wink:.<br />
We use [eslint](http://eslint.org/) to enforce some coding rules (2 spaces indentation, etc.), ideally use an IDE to help you comply with these rules.<br />
Before pushing anything, please be sure to check that the tests are OK by running `yarn test` or `npm test` and that your code complies with the coding rules by running `yarn lint` or `npm run lint`.

#### Documentation :bulb:
The better the documentation, the less questions users will ask themeselves.<br />
We [use jsdoc](http://usejsdoc.org/) to document our code, if you write any new code please write the documentation with it and try to conform to the existing documention.<br />
If you want to see the result of what you wrote you can run `yarn docs` or `npm run docs`, it will generate the documentation in `docs/<version>/`.
:warning: Please do not commit the files generated in `docs/`, it is automatically updated once we create a new tag.

#### emojis :beers:
We really :heart: emojis, and we would like you to share our :heart:.<br />
Each and every commit message has to be prefixed by an emoji.<br />
Please refer to [the gitmoji guide](https://gitmoji.carloscuesta.me/) to know which one to use.

## I have a question :question:
If you are not sure whether to report a bug or ask for a new feature, or if you just have a question about anything, please [create an issue](https://github.com/Zenika/immutadot/issues/new).

## Code of conduct :page_facing_up:
In order to keep a happy and respectful atmosphere around the project, we expect everyone participating in it to follow our [Code of conduct](https://github.com/Zenika/immutadot/blob/master/CODE_OF_CONDUCT.md).
