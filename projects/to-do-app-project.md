---
title: 'The infamous To-do App'
dateCreated: '2023-05-01'
image: 'image_dp.jpg'
summary: 'What would a web developer's journey be without the handy to do app- without it you wouldn't know what to do... '
author: 'Aldo Garcia'
isFeatured: true
stack: ['JavaSript', 'Firebase', 'React', 'Redux']
---

# this is a title

This is some regular text with a [link]

```js
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
    dispatch(sendReminderData(reminders))
  }, [ dispatch,reminders]);

  return (
    <div className="App">
      <Search />
      <AllReminderContent />
    </div>
  );
}
```

```js
const reminderSlice = createSlice({
  name: "reminders",
  initialState: {
    reminders: DUMMY_DATA,
    filterInput: null,
  },
  reducers: {
    generateReminders: (state, action) => {
      state.reminders = action.payload;
    },
    addReminder: (state, action) => {
      const reminderIndex = state.reminders.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      const reminderExists = state.reminders[reminderIndex];
      let updateReminder;
      let updatedList;
      if (!reminderExists) {
        return { ...state, reminders: [...state.reminders, action.payload] };
      } else {
        updatedList = [...state.reminders];
        updateReminder = {
          ...reminderExists,
          notes: action.payload.notes,
          name: action.payload.name,
          priority: action.payload.priority,
          dueDate: action.payload.dueDate 
        };
        updatedList[reminderIndex] = updateReminder;
      }
      return { ...state, reminders: updatedList };
    },
    completeReminder: (state, action) => {
      const completedReminder = state.reminders.findIndex(
        (reminderItem) => reminderItem.id === action.payload.id
      );

      state.reminders[completedReminder].isCompleted = Statuses.COMPLETE;
    },
    deleteReminder: (state, action) => {
      const remainingReminders = state.reminders.filter(
        (reminderItem) => reminderItem.id !== action.payload.id
      );
      return { ...state, reminders: remainingReminders };
    },
    reminderFilter: (state, action) => {
      state.filterInput = action.payload;
    },
  },
});
```
