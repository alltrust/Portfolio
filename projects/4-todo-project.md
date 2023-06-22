---
title: 'Infamous Todo App'
dateCreated: '2023-05-01'
image: 'todo-project.PNG'
subHeading: 'Simple todo application to start a good journey'
summary: 'What would a joruney be without the handy todo app, without it you wouldnt know what todo'
author: 'Aldo Garcia'
isFeatured: false
stack: ['JavaScript', 'Firebase', 'React', 'Redux']
---

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

```js
const reminderSlice = createSlice({
  name: 'reminders',
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
          dueDate: action.payload.dueDate,
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
