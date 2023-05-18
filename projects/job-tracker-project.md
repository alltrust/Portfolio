---
title: 'Job Tracker'
dateCreated: '2023-05-01'
image: 'image_dp.jpg'
summary: 'How many jobs have you applied to recently? Too many to keep track of ? You see where im getting at (hence the title of the app)'
author: 'Aldo Garcia'
isFeatured: true
stack:
  [
    'Typescript',
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'StyledComponents',
    'RTL',
    'Jest',
  ]
---

# this is a title

```js
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

```js
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

This is some regular text with a [link](http://google.ca)
