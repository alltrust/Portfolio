---
title: 'Infamous Todo App'
dateCreated: '2023-04-28'
image: 'todo-project.PNG'
subHeading: 'Simple todo application to start a good journey'
summary: 'What would a joruney be without the handy todo app, without it you wouldnt know what todo'
author: 'Aldo Garcia'
isFeatured: false
stack: ['JavaScript', 'Firebase', 'React', 'Redux', 'Redux-toolkit']
---

The moment you have been waiting for, a todo app with a state management library that it certainly did not need- but wanted. Using React with Redux to dispatch state throughout.

### Quick look

Immediately you can see that there are functions that handles the behaviour of the state and the selection of state with `dispatch` and `reminders`. `useDispatch()` is provided by [React-Redux](https://react-redux.js.org//) along with `useSelector()` which are used to interact with the state in the redux store.

`useDispatch()` is used to 'dispatch' certain behaviours and update the state in the redux store- while `useSelector()` is used to access the current value of that particular state.

```js
// App.js
let isInitialLoad = true;

function App() {
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.configureReminder.reminders);

  useEffect(() => {
    dispatch(getReminderData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }
    dispatch(sendReminderData(reminders));
  }, [dispatch, reminders]);

  return (
    <div className="App">
      <Search />
      <AllReminderContent />
    </div>
  );
}
```

In this component, the `useEffect()` react hook is used for handling side effects when the components renders. In this case the first instance of `useEffect()` will dispatch a `getReminderData()` on **component mount**. `getReminderData()` will fetch the data that has to do with all the reminders. We will look more at other dispatch functions and their sources later.

The second instance of `useEffect()` dispatches `sendReminderData()` with the `reminders` as an argument only when the reminders state changes and when it is not the initial rendering of the component. If it is the initial rendering, it returns early and set the `isIniitalLoad = false`.

### Something about Redux & Redux-Toolkit

[Redux-Toolkit](https://redux-toolkit.js.org/) provides us with utility functions that allow us to configure and update our redux store. Let's examine the **slice** of reminder actions that will we use to configure our store.

We use the `createSlice()` function provided by redux-toolkit it allows us to sets the `name` and the `initial state` for the corresponding "slice", define **reducer functions** for handling the actions that will be dispatched throughout our appliction, and set **action creators** automatically from these reducers.

```js
// store/reminders.js
const reminderSlice = createSlice({
  name: 'reminders',
  initialState: {
    reminders: [],
    ...
  },
  reducers: {

    addReminder: (state, action) => {
...
    },
    ...
  },
});


export const {
  addReminder,
 ...
} = reminderSlice.actions;

export default reminderSlice.reducer
```

Let's look at the `addReminder()` reducer a little bit closer.

#### createSlice()

Initially we perform an existence check to determine that the reminder already exists in our state or not. If it does not exist, it adds the new reminder to state.reminders with the appropriate payload for that reminder with `action.payload`.

```js
// store/reminders.js
const reminderSlice = createSlice({
  ...,
  reducers: {

    addReminder: (state, action) => {

      const reminderIndex = state.reminders.findIndex(
        (reminder) => reminder.id === action.payload.id
      );

      const reminderExists = state.reminders[reminderIndex];
      let updateReminder;
      let updatedList;

      if (!reminderExists) {
        return { ...state, reminders: [...state.reminders, action.payload] };
      }
     ...
    },
    ...
  },
});

...
```

However, if the `state.reminder` already contains that reminder, it creates a new list `updatedList` where is copies all of the reminders, through array destructuring `[...state.reminders]`. It then takes that existing reminder and updates the `notes`, `name`, `priority`, & `dueDate` properties of that reminder.

```js
// store/reminders.js
const reminderSlice = createSlice({
  ...,
  reducers: {

    addReminder: (state, action) => {
   ...
      else {
        updatedList = [...state.reminders];
        updateReminder = {
          ...reminderExists,
          notes: action.payload.notes,
          name: action.payload.name,
          priority: action.payload.priority,
          dueDate: action.payload.dueDate,
        };
        updatedList[reminderIndex] = updateReminder;
      }

      return { ...state, reminders: updatedList };
    },
    ...
  },
});

...
```

Through direct indexing it then locates the index of that reminder, and sets it equal to the new `updatedReminder` - finally returning the new `updatedList` as the `reminders` state.

It is important to understand that this perhaps wasn't the 'cleanest' approach to perform this task- although it does work.

Why is that? For that we have to look at mutability vs immutabilty and a library named Immer.

#### Mutable, Immutable, & Immer

Simply, if something is mutable is can 'mutate' meaning change. Therefore, if something is immutable, it cannot change. Primitive types like boolean, numbers, and string are immutable; whereas reference types such as arrays and objects are mutable.

Therefore, in the previous `addReminder()` function, it follows the principle of immutability by not changing/mutating the original state directly- but rather it creates new arrays and objects by _copying_ them and then updating them.

This is where [Immer](https://www.npmjs.com/package/immer) comes in handy. It conveniently comes with redux-toolkit and simplifies having to write immutable logic. For example, `produce` is a function provided by the Immer library that takes two arguments, the state and a callback function. The callback function is given a _draft_ of the original state and within the callback itself, it is safe to write mutable code to change the state. Here is an example directly from the redux-toolkit docs:

```js
import produce from 'immer';

const baseState = [
  {
    todo: 'Learn typescript',
    done: true,
  },
  {
    todo: 'Try immer',
    done: false,
  },
];

const nextState = produce(baseState, (draftState) => {
  // "mutate" the draft array
  draftState.push({ todo: 'Tweet about it' });
  // "mutate" the nested state
  draftState[1].done = true;
});
```

However, we don't have to import `produce` from immer directly because the `createReducer()` Api uses immer automatically, and our `createSlice()` function uses the create reducer function internally already. Therefore we can actually write the `addReminder()` this way:

```js
// store/reminders.js
const reminderSlice = createSlice({
  ...,
  reducers: {
     addReminder: (state, action) => {
      const reminderIndex = state.reminders.findIndex(
        (reminder) => reminder.id === action.payload.id
      );

      if (reminderIndex === -1) {
        // because we are manually handling immutability.
        state.reminders.push(action.payload);
      } else {
        const updateReminder = {
          ...state.reminders[reminderIndex],
          notes: action.payload.notes,
          name: action.payload.name,
          priority: action.payload.priority,
          dueDate: action.payload.dueDate,
        };
        state.reminders[reminderIndex] = updateReminder;
      }
    },
    ...
  },
});
...
```

Important to note that we avoid using the `return` statement as we did before because this way we allow immer to track changes made to the state object. So if the `return` statement would be included, it would break the immutability handling by immer.

Going back to see what remains to by examined by our `/store/reminders.js` module, we are left with exporting the `creatSlice.action` so that we can dispatch the `addReminder` actions throughout our application, for example.

```js
...
export const {
  addReminder,
 ...
} = reminderSlice.actions;

export default reminderSlice.reducer
```

We also export `reminderSlice.reducer` so that we may add the reducer to our store configurations- which we will look at next.

#### configfureStore()

Now that we have a reducer, we must configure it in our store and the reminder state will be available throughout our application. Whenever an action is dispatched that has to do directly with reminders, the store will pass it to the reducer to handle and modify the reminder state.

```js
// store/store.js'
import ReminderReducer from "./reminders";

const store = configureStore({
  reducer: {
    ...
    configureReminder: ReminderReducer,
  },
});

export default store;
```

If you are curious about how the state it provided throughout the application, we wrap our <App/> in a <Provider/> and pass the `store` as a prop

```js
// index.js
...
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
```

Now our entire application has the ability to access the state from the store, as well as dispatch particular actions to then modify that state!
