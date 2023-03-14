#  Autofill Timesheet: metrics visualization
I imaging a scenario, where the team is in front a problem regarding the time required for filling the timesheet.

The scope of this challenge, is to build a Frontend + Backend application that allows the user to post and visualize metrics in a usable way.

#
`the scenario`
## Why / The problem
* The time spent to complete at end of the month the timesheet is too long.
* Some utility are already available, but are not enough to resolve the problem.
* Some existing metrics return that the time spent on completing the timesheet is in a range of 15 minutes and 45 minutes.
* Our customer satisfaction KPI values are impacted by the problem

## How / The proposed solution
Adding a new utility to the timesheet page, that allow the user to autofill the timesheet connecting it to it's calendar, with the scope of reduce drastically the time for the required effort.

In order to reduce risk and validate the assumptions:
* an MVP version is realead in production and available only to the 10% of users that have access to the Timesheet page and user are using google calendar.
* are collected some metrics useful to determine if the required time for the task is decreasing

Are monitored four user journey:
* `Happy path: the user in two steps is able to autofill the timesheet.`
     * the user click on "autofill form calendar" button
     * the user review the entries and submit the autofilled timesheet

* `Half happy path with edit: the user in three steps is able to autofill the timesheet.`
     * the user click on "autofill form calendar" button
     * the user review the entries and edit the timesheet
     * the user submit the edited timesheet

* `Unhappy path: the user is not able to use the feature.`
     * the user click on "autofill form calendar" button
     * the user review the entries and click on cancell (a survey is shown)
     * the user click on "skip survey" button

* `Unhappy path with survey data: the user is not able to use the feature and explain us why can't use the feature.`
     * the user click on "autofill form calendar" button
     * the user review the entries and click on cancell (a survey is shown)
     * the user give us a feedback click on "submit survey" button

## What / The expectaction
In two months, enough data are collected to compare with the earliest report and determine if the goal is reached, then continue to improve the feature or the we need to consider the test as a failure and is required to find an other solution to the problem.
#

# Installation

Download, or clone the repo in one folder and install packages.

```bash
To install dependencies use `npm install`
```

# Usage
The project is connected to a JSON server that is running locally.

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
### Navigates on the browser `http://localhost:5173`
Once the app and the server are running, open a browser and visit this page: http://localhost:5173
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
## Used tools:

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

#
# Notes

`the approach`
* In order to work to this challeng in a confortable way for me, I imagined a scenario build on a realistic model / procedure of work.

     * understand the problem
     * respond to all doubts
     * solutions investigation
     * deepen both technical and non-technical topics
     * task and prioritization
     * implementation
* To speed up the implementation I used a starter web application created previously by me  [ https://github.com/gianlucasudano/web-dev-lab#readme ]

`task and prioritization`

1) Use the collected material during the initial analysis
     * Start writing the README
     * Reuse the investifation code, improving it, adapting it to the project architecture, and test it
2) Handle the GET api
     * handler api
     * hook queries to consume data on the frontend
     * mock api with MSW
3) Create the page layout and consume GET data
     * page layout
     * render the received result
     * handle state returned by the query
4) Create a component that consume the metric
     * component and test
5) Show the metrics related to the user journey: 4 cases
     * Happy path: [ 'IMPORT_FROM_CALENDAR', MODAL_SUBMIT' ]
     * Half happy path: [ 'IMPORT_FROM_CALENDAR', 'MODAL_EDIT', MODAL_SUBMIT' ]
     * Unhappy path: [ 'IMPORT_FROM_CALENDAR', 'MODAL_SKIP_SURVEY' ]
     * Unhappy path with survey data: [ 'IMPORT_FROM_CALENDAR', 'MODAL_SURVEY', 'MODAL_SUBMIT_SURVEY' ]
6) Handle the POST api
     * handler api
     * hook mutation to post data on the frontend
     * mock api with MSW
7) Create a component that allows the user to post a new entry in the DB
     * select an "event"
     * select the date (in a range of two months)
     * submit
     * integrate in the page
8) Explore and test the solution
     * collect and list eventual improvements and desiderable

`todo, desiderable`

* generate the initial db entries on running the server
* src/queries/normalizers.ts date formatted fails on testing (difference time between server and local?) 
     * postponed problem: will format in the FE
* move mock data to src/mocks/handlers/mocks.ts
* split if possible the function getGroupedMetrics in three and reduce left to right
with a pipe function https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d.
In general theese normalizer needs improvements and simplifications, and some logic doublecheck.
* variable names can be revisited
* missing types, missing tests
* double check on which values are returned for latestDate, and earliestDate.
* profiling and verify if memoization is required.

      
     