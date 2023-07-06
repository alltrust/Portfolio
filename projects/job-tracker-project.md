---
title: 'Job Tracker'
dateCreated: '2023-05-03'
image: 'job-tracker-project.PNG'
subHeading: 'Track, delete, update and track some more'
summary: 'How many jobs have you applied to recently? Too many to keep track of ? You see where im getting at ...hence the title of the app...'
author: 'Aldo Garcia'
isFeatured: true
stack:
  [
    'Typescript',
    'React',
    'Nodejs',
    'Express',
    'MongoDB',
    'StyledComponents',
    'RTL',
    'Jest', 
    'CSS'
  ]
links: ['https://github.com/alltrust/job-tracker-app']
---

Jobify is a job tracker application that combines MongoDb, Express, React, and Node.js (MERN) in this fullstack typescript application. It allows users to record, update, and track their job prospects and also provide a simple data visualizer to capture the summary of an individual on their job hunting journey.

### Create Job on the Server

Looking at the `createJob()` asynchronous function, it destructures the position and company that was inputted by the user from the `req.body` . If either of those data are missing, we pass those errors to the [Express](https://expressjs.com/) **next middleware** function. If this check is passed, we want to add the `createdBy` property of the `req.body` to the authenticated `userId`, but only if there is one, hence the `?` operator.

The users `job` is then created on the database, and a response is sent back to the client with a **status code** of `statusCodes.CREATED`, 201, and the `job` object.

```js
//appContext.tsx
const createJob = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { position, company }: UserJob = req.body;

  if (!company || !position) {
    const errors = new BadRequestError('Please Provide all Data values');
    next(errors);
  }

  req.body.createdBy = req.user?.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
```

#### On the Client

From the client-side perspective, we are triggering different `dispatch()` functions and using **state**, both provided with the **Context Api** to handle the request to create the user's job.

```js
// appContext.tsx
const createJob = async () => {
  try {
    dispatch({ type: 'SETUP_USER_BEGIN' });

    const { position, company, jobType, status, jobLocation } = state;
    const currentJob = { position, company, jobLocation, status, jobType };

    await authFetch.post('/jobs', currentJob);

    dispatch({ type: 'CREATE_JOB_SUCCESS' });
    dispatch({ type: 'CLEAR_JOB' });
  } catch (err) {
    handleCreateJobError(err);
  }
};
```

The function is triggered once a user starts the process of creating a job- in this case it triggers on a form submission. Initially it wraps the actions in a **try-catch** block. It dispatches an action like this:

```js
dispatch({ type: 'SETUP_USER_BEGIN' });
```

The `dispatch` allows us to perform certain actions and update the state. In this case, this `SETUP_USER_BEGIN` performs the action of setting of loading state- which displays a loading spinner to the user.

If you are curious, the reducer that manages this case looks something like this:

```js
// reducer.tsx
const reducer = (state: NotificationState, action: ActionTypes): any => {
  switch (action.type) {
    ...
    case "SETUP_USER_BEGIN":
      return {
        ...state,
        isLoading: true,
      };
      ...
    default:
      return state
  }
};
```

It returns the current state `...state`, and ensures that the state of `isLoading: true`. This allows us to use that `isLoading` state and give some sort of visual display to the user to let them know something action is taking place. In this case we display a custom loading spinner depending on the state of `isLoading`.

This is how it looks like in our tsx component:

```js
//stats.tsx

const Stats = ()=>{
    const {isLoading } = useAppContext()

  ...
    if(isLoading){
        return <Loading center/>
    }
    return (
        <>
        <StatsContainer/>
        ...
        </>
    )
}
```

Going back to the `createJob` handler, we dectructure the necessary data criteria from the state, and store it in the `currentJob` constant. This object is sent with a **post** request to the `/jobs` route.

```js
// appContext.tsx
const createJob = async () => {
  try {
   ...

    const { position, company, jobType, status, jobLocation } = state;
    const currentJob = { position, company, jobLocation, status, jobType };

    await authFetch.post('/jobs', currentJob);

    ...
  } catch (err) {
    ...
  }
};
```

This asynchronous operation is handled via `authFetch.post('/jobs, currentJob)`. Let's look a little closer at this request.

#### Axios Interceptors

Axios interceptors allow us to 'intercept' and modify HTTP requests and responses before they are handled in our code. In our case we create an instance of Axios with the `{baseUrl:http://localhost:4000/api/v1}`.

Why did we do this? Because that is the base of the route where all of our requests are made. It prevents us from having to retype that url for every request, and just change the url endpoints. Remember `/jobs`? That would be appended to the baseUrl.

We then modify the request by changing the configuration object and ensuring that the HTTP `Authorization` header has a value of `Bearer ${state.token}`. As you can see in the code block below, the token is stored in the applictions state.

In the response interceptor, we return the response as is, but if there are any errors that contain a status code of `401` we log the user out with `logoutUser()`. The 401 status means that this is a request made from an unauthorized user.

```js
  const authFetch = axios.create({
    baseURL: "http://localhost:4000/api/v1",
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers!["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
```

Back once more to our `createJob()`, we dispatch other actions that, without going into too much detail because it resembles our previous dispatch example, provides the user visual feedback that an action occurred. If at any point of performing this operation there is an error, the `catch` block handles this error, which contains logic that leads to the user recieving a notification of an unsuccessful operation.

```js
// appContext.tsx
const createJob = async () => {
  try {
    ...
    dispatch({ type: 'CREATE_JOB_SUCCESS' });
    dispatch({ type: 'CLEAR_JOB' });
  } catch (err) {
    handleCreateJobError(err);
  }
};
```

### Pagination

Let's say the user of this app has been creating many jobs, and is seriously on the job hunt. They are then going to have many jobs stored in the database. It would be convenient for them to also have access to search through all their created jobs by different parameters and return only those jobs that fit those provided parameters in an organized fashion.

For this we would include a function that allows users to make a request (perhaps through a search box input) that enables them to get all the related jobs to their search. We might even make it so that they can use filters(parameters) to limit their search results.

This would be great! However, this does raise an important concern. Do we want to always send a request from the client side to get ALL of the users jobs, and once we have all (let's say 200) jobs, we would filter it on the client-side of the application? Or would it be more optimal to send certain parameters with our request to the backend to only return those specific jobs?

If you thought the second approach would be the optimal choice then you were correct! This is where the concept of **pagination** can come into play.

#### On the Client

The `getJob()` function gathers the `SearchParams` from the `state`. These parameters are used to make a **query string**, that is passed to the `url` variable and then used to make a request, using `authFetch()`, to the backend of our application.

The query string contains key-value pairs (ie. `page=${page}`) for the server of our application can take these values and return a curated depending on these values.

```js
// appContext.tsx
const getJobs = async () => {
  const { search, status, jobType, sort, page }: SearchParams = state;
  let url: string = `jobs?page=${page}&status=${status}&jobType=${jobType}&sort=${sort}`;

  if (search) {
    url = url + `&search=${search}`;
  }
  ...
  try {
    const response = await authFetch(url);
    const { jobs, totalJobs, numOfPages }: JobsResponse = response.data;

  ...
  } catch (err) {
    ...
  }
};
```

We can now access these query string parameters on the server in the `req.query` object.

#### On the Server

```js
// jobsController.ts
// interface QueryObject {
//   createdBy: string | undefined;
//   status?: string | ParsedQs | string[] | ParsedQs[];
//   jobType?: string | ParsedQs | string[] | ParsedQs[];
//   position?: string | ParsedQs | string[] | ParsedQs[];
// }

const getAllJobs = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { status, jobType, search, sort } = req.query;

  const queryObject: QueryObject = {
    createdBy: req.user?.userId,
  };

  if (status && status !== 'all') {
    queryObject.status = status;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let result = Job.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }

  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  if (sort === 'a-z') {
    result = result.sort('position');
  }

  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 4;
  const skip: number = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;
  const totalJobs: number = await Job.countDocuments(queryObject);
  const numOfPages: number = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
```

Don't be concerned by the size of this getAllJobs controller. It can be broken down into a few steps:

1. extract the parameters and create a `queryObject`.

```js
// jobsControlles.ts

const getAllJobs = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { status, jobType, search, sort } = req.query;

  const queryObject: QueryObject = {
    createdBy: req.user?.userId,
  };

  if (status && status !== 'all') {
    queryObject.status = status;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
    let result = Job.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }

  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  if (sort === 'a-z') {
    result = result.sort('position');
  }

  if (sort === 'z-a') {
    result = result.sort('-position');
  }
  ...
}
```

Look, the `status`, `jobType`, `search`, and `sort` parameters we passed in from our client-side `getJob()` function.

All we did was conditionally check these parameters to ensure `if` that paramter existed, and it didnt have a value of `all`, then it would contain a different value and we want that to curate a `queryObject` so we can use to then `find()` those jobs in the corresponding user's data in the database.

There is a sort filter as well so we return the jobs in the order that the users has specified.

2. Page, limit & skip.

```js
//jobController.ts
const getAllJobs = async (
  ...
) => {
  ...
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 4;
  const skip: number = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  ...
};
```

Now we examine the `page` & `limit` parameter from the `req.query` object just like we did with the other parameters. This tells the server which page the user selected and so we need this information to select the appropriate jobs for the corresponding page and how many of those jobs we want to send with the response.

`skip()` is where the magic happens in this example. The logic reads, subtract the page number specified by 1, and multiply it by the limit. Keep in mind this is how many documents we will 'skip' by when we send our response object back to the client.

For example, let's say we have 12 job documents that match our query, and the user is requesting the documents for the second page. 2 minus 1 equals 1. 1 multiplied by 4 is 4.
Therefore, our result skips the first 4 items in the array `[0,1,2,3]` because those would be on the first page, and takes only items 4,5,6,7 (because there is a limit of 4) to send in the response, as those items in those positions of the array would be on the second page.

3. send back the reponse

```js
// jobsController.ts
const getAllJobs = async (
  ...
) => {
  ...
 const jobs = await result;
  const totalJobs: number = await Job.countDocuments(queryObject);
  const numOfPages: number = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
```

Now we send the `jobs`, `totalJobs`, & `numOfPages` as a json object back to the client, along with a status code of `OK`- which is 200. The totalJobs allows us to know how many pages there will be according to the specified search, which is why we divide it by the `limit`. This is then useful for the client side of the application because it can allows us to display the corresponding number of page buttons to our user.

### Testing

Isn't there pure enjoying in running tests...

Maybe you read through my sarcasm, but here I want to share how we can use the [msw](https://mswjs.io/) library to perform the sometimes annoying task of testing requests and responses with a mock server. Hopefully it will make your testing run a little smoother.

When mocking a response for a user's request, we want to also create a mock server- rather than hammering our actual database with mock requests. This can lead to unecessary server calls as well as potentially harming our database configurations.

One way was can do this is to create a function that mocks the context that would be given as a response based on a particular request route (path).

```js
// test/server.tsx

interface IHandlerConfig {
  path: Path;
  res: (
    req: RestRequest,
    res: ResponseComposition<DefaultBodyType> | ((arg0: any) => any),
    ctx: RestContext
  ) => {};
}

export const createServer = (handlerConfig: IHandlerConfig[]) => {
  const handlers = handlerConfig.map((config) => {
    return rest.all(config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
};
```

This function first takes an array of objects that contains a `path` as well a `res` object and maps them to create a handlers varriable. This variable contains an array of handler functions.

```js
// test/server.tsx
export const createServer = (handlerConfig: IHandlerConfig[]) => {
  const handlers = handlerConfig.map((config) => {
    return rest.all(config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });
...
}

```

`rest.all()` function, provided by the msw library, takes in any HTTP method (GET, POST, PUT, DELETE, etc.) and allows you to create any response for any type of request made. The `path`, therefore, represents the intercepted route. The second parameter serves as the request handler. `(req,res,ctx)=>{}` is a callback function that handles the request and returns a response.

The request handler recieves the `ctx` and `res` as parameters and calls `config.res(req,res,ctx)` to retrieve the response data for this request path. In other words -the data is returned by `config.res` and then passed to `ctx.json` to format the data as a json reponse.

The `createServer()` function then creates a server that will be passed into callback function provided by [jest](https://jestjs.io/). These callbacks configure settings for the server:

- before all the tests start, start the server and listen for paths to intercept
- after each individual test, reset the handlers that were passed so each test can start with clean server state
- after all of the test have ran, close the mock server.

```js
export const createServer = (handlerConfig: IHandlerConfig[]) => {
 ...
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
};
```

Now you can use this function in your testing function components whenever you have to mock a request to any path. Remember to include the expected properties that the specified react component is expecting. Here is an example of a created server for a component that uses `defaultStats` and `monthlyApplications` to display certain data.

#### Jest with RTL

```js
//stats.test.tsx

describe('Stats page', () => {

  createServer([
    {
      path: 'http://localhost:4000/api/v1/jobs/stats',
      res: () => {
        return {
          defaultStats: { declined: 2, interview: 10, pending: 2 },
          monthlyApplications: [{ date: 'Mar 2023', count: 14 }],
        };
      },
    },
  ]);

  test('stats containers should display status quantities and charts container', async () => {

    render(
    <AppProvider>
      <MemoryRouter>
        <Stats />
      </MemoryRouter>
    </AppProvider>
    );

    const statsContainers = await screen.findAllByRole("article");
    const chartsContainer = await screen.findByTestId("test-charts-container");
    const monthlyAppsHeader = await screen.findByRole("heading", {
      name: /monthly applications/i,
    });
    const chartToggleBtn = await screen.findByRole("button", {
      name: /areachart/i,
    });

    expect(chartsContainer).toBeInTheDocument();
    expect(monthlyAppsHeader).toBeInTheDocument();
    expect(chartToggleBtn).toBeInTheDocument();

    const numOfInterviewsCount = within(statsContainers[1]).getByText("10");
    expect(numOfInterviewsCount).toHaveAttribute("class", "count");
...
  });
});
```

Now we can use Jest with [React-testing-library](https://testing-library.com/docs/react-testing-library/intro) to create a description of the component or page we are testing, and what we are testing for.

In this case we are testing that in the `statsPage`, there indeed are necessary status quantities (sent by our mocked server in the `defaultStats` object) as well as charts container.

In testing components, we have a three step patterns:

1. Arrange- You prepare the test with the initial condititions that the component is under
2. Act- Simulate real user behaviour on the interface
3. Assert- Specify the expected outcomes of that behaviour.

#### Arrange

In the `render()` method provided by RTL, we wrap our `<Stats/>` page in our `<AppProvider>` and `<MemoryRouter/>` to replicate the environment that our stats page is under. The `AppProvider` is the context that wraps around our entire application, and the `MemoryRouter` is provided by the `react-router-dom` which simulates the behaviour of react router in our testing environment.

```js
...
 render(
    <AppProvider>
      <MemoryRouter>
        <Stats />
      </MemoryRouter>
    </AppProvider>
    );
    ...
```

#### Act

When using RTL we have query methods that help look for our requested components that appear on users page. In this case we use the `find()` query method because components we are looking for on the users screen are asynchronous- hence why they have the `await` keyword.

If we look at the `statsContainer` we await for the `screen` object, and on that screen, find all of the elements that have an `article` role, this varies on how you structured the particular element you are looking for. Now `statsContainer` is an array that contains all of the found `article` elements.

```js
...
const statsContainers = await screen.findAllByRole('article');
const chartsContainer = await screen.findByTestId('test-charts-container');
const monthlyAppsHeader = await screen.findByRole('heading', {
  name: /monthly applications/i,
});
const chartToggleBtn = await screen.findByRole('button', {
  name: /areachart/i,
});
...
```

#### Assert

Now we just set the expectations that we have based on the actions we've simulated. We now expect that after screen renders, we have elements that match `montheAppsHeader`, `chartsCOntainer`, `chartToggleBtn` to be in present in the document object model- using `toBeInTheDocument()`.

```js
...
expect(chartsContainer).toBeInTheDocument();
expect(monthlyAppsHeader).toBeInTheDocument();
expect(chartToggleBtn).toBeInTheDocument();

const numOfInterviewsCount = within(statsContainers[1]).getByText("10");
expect(numOfInterviewsCount).toHaveAttribute("class", "count");
    ...
```

If we recall from earlier when we sent the mocked data, we sent `interviews` to have a value of `10`.

```js
...
  defaultStats: { declined: 2, interview: 10, pending: 2 }
  ...
```

So we locate the second element in the `statsContainers` array, and `get` it by the text of `10`. We can now expect that this element, `numOfInterviewsCount`, has a `class` attribute, which has a value of `count`. This is another way of identifying that our elements are displaying as expected on the users screen.
