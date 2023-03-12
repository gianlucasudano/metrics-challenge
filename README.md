# Web Dev Lab (WIP)

## Why a new template?

I developed a starter web application using the stack technologies I have used in my previous work experience. The purpose of this project was to refresh my knowledge and have a ready-to-use tool for prototyping and studying.

The project is still a work in progress and has not been completed yet. There are currently some examples available on the "example" page, with more to be added in the future.

It's worth noting that I used MUI for this project to speed up implementation, even though I hadn't used it in any of my past work experiences.


# Installation

Download, or clone the repo in one folder and install packages.
You can also use the repo as template, and create a new project strating from this.

```bash
To install dependencies use `npm install`
```

# Usage
The project is focused on the front-end and is connected to a JSON server that is running locally.

To run the app, open your terminal and execute the command `npm run dev`. Once the app has started, you should see something similar to the following.
###  Runs the app `npm run dev`
```bash
     VITE v4.1.1  ready in 643 ms
      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h to show help
```

To run the json server, open a new tab in your terminal and execute the command `npm run backend`. Once the server has started, you should see something similar to the following.

### Runs the server `npm run backend`
``` bash
     \{^_^}/ hi!

     Loading localDb/example.json
     Done

     Resources
     http://localhost:3000/example

     Home
     http://localhost:3000
```
#
### Navigates on the browser `http://localhost:5173/#/example`
Once the app and the server are running, open a browser and visit this page: http://localhost:5173/#/example
#
To run all tests, open a new tab in your terminal and execute the command `npm run test`. Once the tests has executed, you should see something similar to the following.
### Runs the tests `npm run test`
``` bash
    ✓ src/pages/Example/ErrorCard.test.tsx (1)
    ✓ src/pages/Example/AddData.test.tsx (2) 801ms
    ✓ src/pages/Example/DataDisplay.test.tsx (3) 791ms
    ✓ src/App.test.tsx (2)

    Test Files  4 passed (4)
         Tests  8 passed (8)
      Start at  18:50:49
      Duration  5.92s (transform 227ms, setup 3.52s, collect 7.34s, tests 1.75s)


    PASS  Waiting for file changes...
          press h to show help, press q to quit
```

#
## The project utilized the following tools:

- "vite": https://vitejs.dev/
- "vitest": https://vitest.dev/
- "react": https://reactjs.org/
- "typescript": https://www.typescriptlang.org/
- "msw": https://mswjs.io/
- "axios": https://axios-http.com/
- "react-query": https://tanstack.com/query/latest
- "react-hook-form": https://react-hook-form.com/
- "testing-library": https://testing-library.com/
- "json-server": https://www.npmjs.com/package/json-server
- "MUI": https://mui.com/



