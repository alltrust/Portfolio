---
title: 'Campground App'
dateCreated: '2023-05-01'
image: 'yelp-campground-project.PNG'
subHeading: 'Every campground is an adventure'
summary: 'Like a yelp Camground app where you can map out a campground with images, description and location. Login and register a campground, or review someone elses!'
author: 'Aldo Garcia'
isFeatured: true
stack:
  [
    'JavaScript',
    'Node.js',
    'Express',
    'Ejs',
    'MongoDB',
    'Passport',
    'MapBox SDK',
    'BootStrap',
  ]
---

This Yelp-like campground app uses the [MapBox SDK](https://www.npmjs.com/package/@mapbox/mapbox-sdk) for users to locate, create, review and update campgrounds in their respective areas.
This application follows an MVC (Model-View-Controller) software architect pattern.

### Something about MVC

The model represents the data and logic of how it will be handled, validated and interacts with a database. 
The Views, in this case, are HTML templates using [ejs](https://ejs.co/) as a templating engine. 

The controller is the intermediary between user interaction in the views, modifies the data from the models, and returns the data according to the operations- you can think about the controller like the person who delivers your pizza. You specified how you want your pizza and made a request to order the pizza. The person delivering coordinates the process to take your pizza request (can ensure you toppings are available...), make your pizza, and deliver it to you! 


### Getting Started

To get a taste of what is happening behind the scenes of this application, let's dissect the `updateCampground()` function (controller).

There are a few things required when a particular campground recieves an update, those being the `id` of the `campground`, and the `imgs` associated with the corresponding campground.
The campground id is used to pass to the `findByIdAndUpdate()` mongoose method as well as the new details to be saved as that current campgrounds new data object.

It can be read as, "using this id, find this campground, and update it with the new campground details".

Also, it is important to note that this function is **asynchronous** because its is writing to a database- hence why we use `async` at the top of the function, and `await` on any calls that require time to execute.

```js
// controllers/campground.js
module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));

  campground.images.push(...imgs);

  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }

  req.flash('success', 'successfully updated campground');
  res.redirect(`/campgrounds/${campground._id}`);
};
```

The images are handled in this function with these lines:

```js
// controllers/campground.js
module.exports.updateCampground = async (req, res) => {
    ...
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));

    campground.images.push(...imgs);
...
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
...
}
```

Here the `imgs` that were uploaded to edit (via `req.files`) are saved into an array with each image containing a url, and a filename. This new array of then appended to the end of the current array of that campground `campground.images`.

However, if we deleted any images that were previously associated with that campground, we do two things. We remove them from our [cloudinary](https://cloudinary.com/) storage- which hosts the uploaded images for our app. We also delete the corresponding filename of that image that is stored in our database using this line:

```js
// controllers/campground.js
await campground.updateOne({
  $pull: { images: { filename: { $in: req.body.deleteImages } } },
});
```

In words this can be read something like, "the filename that matches the the filename of image to delete, pull it out and update that corresponding campground".

If are you curious as to how that looks in the ejs file:

```js
// views/campgrounds/edit.ejs
<input type="checkbox" id="image-<%=i%>" name="deleteImages[]" value="<%=img.filename%>">
```

As you can see, the `img.filename` is passed as a value of the checked image to delete.It contains the `name=deleteImages[]`, which if you remember is the array of deleted images that was passed to the `updateOne()` method- `{$in: req.body.deleteImages}`.

Finally, it gives the user a success notification and redirects it to the current campground page that was edited.

```js
// controllers/campground.js
...
req.flash('success', 'successfully updated campground');
res.redirect(`/campgrounds/${campground._id}`);
```

### User Authentication and Persistance

In many app, user logins and registrations have to be validatated, authenticated and persisted for a smooth user experience. For a node.js application, it is very common to use [Passport](https://www.passportjs.org/) as middleware to authenticate and authorize users.

```js
//index.js

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60, //has to be in total seconds (this is 24 hours)
  crypto: {
    secret,
  },
});

const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

In this code, via `index.js` file, we create a secret and pass it to the `MongoStore.create()`- from the `connect-mongo` npm package. Here we handle session configuration by passing in:

- the `mongoUrl`, to establish a database connection with MongoDb;
- touchAfter, to establish the intervals of time between updates to session data;
- crypto, to establish integrity of session data (optional)

```js
//index.js
const secret = process.env.SECRET || 'thisshouldbeabettersecret'

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60, //has to be in total seconds (this is 24 hours)
    crypto:{
        secret,
    }
});

...
```

This store is then used to set the session configuration. The session configuration handles the name of the cookie `'session'` that will be saved in the database. This **cookie** plays the role of an identifier between the users browser and the database used for the application. Essentially, the session-data is updated depeding on the previous `touchAfter` property, which we set to 24 hours, and then in this `sessionConfig` object we establish that it should expire and have a maximum age of a week.

The session is then registered to [express-session](http://expressjs.com/en/resources/middleware/session.html).

```js
// index.js
const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig)); //this has to come before passport.session
```

Now that the session is configured and registered with [Express](https://expressjs.com/), we can use Passport to ensure that the user whos session will be persisted is authenticated.

```js
// index.js
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

To authenticate user login credentials via `new LocalStrategy()` for username and password, it is necessary that the session middleware has been established so that Passport can be initialized and permit persistent login sessions.

The **LocalStrategy** is a module that is required by `passport-local`, and we pass in `User.authenticate()`- which we will look into further with `User.serializeUser()` and `User.deserializeUser()`.

The `User` object comes from our User schema- which we required from our user schema model. 

```js
// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)
```

Look at the `passportLocalMongoose`. This module allows us to enable local authentication to our User. This plugin essentially simplifies the authentication process between Passport and the mongoose User schema- which is how we can then use the previous authentication and serialize methods!

### Something about Joi

[Joi](https://joi.dev/api/?v=17.9.1) is very popular **validation** library for javascript. In this application it is used to validate schema definitions- such as the campgroundSchema and the review schema.

For example:

```js
// models/review.js
const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
```

```js
// schema.js
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML(),
  }).required(),
});
```

MAKE SURE IT ALSO SHOWS EDGE CASES IN CASE IT FAILS
When the user leaves a review, joi validates the input it against the review schema. It ensures that when a user leaves a rating, which is to be stored in the database, that before it is stored it MUST be a number rating between 1 and 5. It also ensures that within the content body being written by the user, that it doesn't contain HTML to avoid **XSS attacks**. 

The `required()` method emphasizes that the those properties are a must if a user is to leave a review. 
