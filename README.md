

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
- creates a table of content out of the headers

# Usage

```node packages/epubinator/build/bin/index.js [-m|--multiurl=boolean] [-p|--multipage=boolean] [-o|--output=string] url```
