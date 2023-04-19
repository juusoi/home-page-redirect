# Home Page Redirect

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

---

Home Page Redirect is a simple Node.js server that redirects users to different URLs based on the current day of the week. This project is useful for anyone who wants to create a website that offers daily content or resources. I use it as my browsers home page.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Testing](#testing)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

---

## Features

- Redirects users to specific URLs based on the day of the week
- Supports custom URLs for each day
- Includes test cases for different scenarios

---

## Requirements

- Node.js (v18.16.0)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/juusoi/home-page-redirect.git
```

Install the necessary dependencies:

```bash
cd home-page-redirect
cd src
npm install
```

---

## Testing

Run the test suite:

```bash
npm test
```

---

## Usage

Start the server:

```bash
npm start
```

Access the server on `http://localhost:3001`

- Weekday can also be given as query parameter i.e.`http://localhost:3001/?day=1`
  - 0 = sunday, 1 = monday ... 6 = saturday

---

## Configuration

Current:

- Monday -> [XKCD](https://xkcd.com/)
- Tuesday, Wednesday -> [HS](https://hs.fi)
- Thursday, Friday -> [2022 in Heavy Metal](https://en.wikipedia.org/wiki/2022_in_heavy_metal_music)
- Saturday, Sunday -> [Random Wikipedia Page](https://en.wikipedia.org/wiki/Special:Random)

Updating:

- Can be changed in `src/server.js`
- Update tests in `src/server.test.js`
- Run linting and tests

```bash
npm run lint
npm test
```

---

## License

Home Page Redirect is released under the [MIT License](https://opensource.org/licenses/MIT).
