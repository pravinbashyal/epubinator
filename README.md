

# epubinator
<img src="https://i.imgur.com/kys3wDv.png" alt="Doofenshmirtz reading to Perry the platypus" width="650" style="object-fit: contain;"/>
NPM package to generate full epub from a link. It uses JSDom under the hood to parse the html.


# Installation

```
yarn global add epubinator

or

npm i -g epubinator

```

# Features

- creates epub out of provided link
- parses through next page for multipage websites (eg tutorials). works most of the times 😅
- creates a navigatable table of content out of the headers for each page

# Usage

```
$ epubinator  \
  [-m|--multiurl=boolean]  \
  [-p|--path=string] \
  [-t|--title=string] \
  [-a|--author=string] \
  url

$ epubunator [-v|--version]
```
![example of downloading https://courses.dcs.wisc.edu/wp/readinggerman/introduction/](https://files.slack.com/files-pri/T0D02RHL6-F01HCHD0FJT/output.gif?pub_secret=d32cb6190a)

# Options

- `-m|--multiurl=boolean` (_default=false_): If set to `true`, searches for next page navigator in the page, until it no longer finds a next navigator. Each page creates an instance in table of contents with a dedicated chapter

- `-p|--path=string` (_default=./_): The path for output file

- `-t|--title=string` (_default= <url of the initial link with '/' replaced with '-' and ':' removed>_): Title of the book. It also sets the filename of output file.

- `-a|--author=string` (_default=''_): Author of the book

- `-v|--version`: Print the current version of package

## License

[MIT](https://opensource.org/licenses/MIT)
