// Just so we know the script is running
console.log("Akshath's Master Calendar script is loaded!");

// 1) List of days in this week (used for mapping day → column index)
const days = [
  { key: "mon", label: "Mon", date: "Dec 1" },
  { key: "tue", label: "Tue", date: "Dec 2" },
  { key: "wed", label: "Wed", date: "Dec 3" },
  { key: "thu", label: "Thu", date: "Dec 4" },
  { key: "fri", label: "Fri", date: "Dec 5" },
  { key: "sat", label: "Sat", date: "Dec 6" },
  { key: "sun", label: "Sun", date: "Dec 7" },
];

// 2) All events for the week as data
const events = [
  // MONDAY
  { day: "mon", start: "06:30", end: "07:00", title: "Home workout", cat: "sports" },
  { day: "mon", start: "07:00", end: "07:50", title: "Breakfast / get ready", cat: "break" },
  { day: "mon", start: "07:50", end: "08:20", title: "Commute", cat: "break" },
  { day: "mon", start: "08:30", end: "15:15", title: "School", cat: "school" },
  { day: "mon", start: "15:15", end: "16:30", title: "Robotics club", cat: "club" },
  { day: "mon", start: "16:30", end: "17:00", title: "Commute home", cat: "break" },
  { day: "mon", start: "17:00", end: "17:15", title: "Snack / short break", cat: "break" },
  { day: "mon", start: "17:15", end: "18:30", title: "Signature homework", cat: "homework" },
  { day: "mon", start: "18:30", end: "19:00", title: "Dinner", cat: "break" },
  { day: "mon", start: "19:00", end: "20:30", title: "AoPS Number Theory", cat: "aops-math" },
  { day: "mon", start: "20:30", end: "21:15", title: "Free / relax", cat: "break" },

  // TUESDAY
  { day: "tue", start: "06:30", end: "07:00", title: "Home workout", cat: "sports" },
  { day: "tue", start: "07:00", end: "07:50", title: "Breakfast / get ready", cat: "break" },
  { day: "tue", start: "07:50", end: "08:20", title: "Commute", cat: "break" },
  { day: "tue", start: "08:30", end: "15:15", title: "School", cat: "school" },
  { day: "tue", start: "15:15", end: "16:15", title: "Business club", cat: "club" },
  { day: "tue", start: "16:15", end: "16:45", title: "Commute", cat: "break" },
  { day: "tue", start: "16:45", end: "17:00", title: "Snack / mini break", cat: "break" },
  { day: "tue", start: "17:00", end: "18:00", title: "Signature homework", cat: "homework" },
  { day: "tue", start: "18:00", end: "18:25", title: "Dinner", cat: "break" },
  { day: "tue", start: "18:30", end: "20:00", title: "AoPS Intro to Python (class)", cat: "aops-code" },
  { day: "tue", start: "20:00", end: "20:45", title: "AoPS Number Theory", cat: "aops-math" },
  { day: "tue", start: "20:45", end: "21:15", title: "Wind down", cat: "break" },

  // WEDNESDAY
  { day: "wed", start: "06:30", end: "07:00", title: "Home workout", cat: "sports" },
  { day: "wed", start: "07:00", end: "07:50", title: "Breakfast / get ready", cat: "break" },
  { day: "wed", start: "07:50", end: "08:20", title: "Commute", cat: "break" },
  { day: "wed", start: "08:30", end: "15:15", title: "School", cat: "school" },
  { day: "wed", start: "15:15", end: "15:45", title: "Travel to tennis", cat: "break" },
  { day: "wed", start: "16:00", end: "18:00", title: "Tennis", cat: "sports" },
  { day: "wed", start: "18:00", end: "18:30", title: "Travel home", cat: "break" },
  { day: "wed", start: "18:30", end: "19:00", title: "Shower + dinner", cat: "break" },
  { day: "wed", start: "19:00", end: "20:15", title: "Signature homework", cat: "homework" },
  { day: "wed", start: "20:15", end: "21:00", title: "AoPS Number Theory", cat: "aops-math" },

  // THURSDAY
  { day: "thu", start: "06:30", end: "07:00", title: "Home workout", cat: "sports" },
  { day: "thu", start: "07:00", end: "07:50", title: "Breakfast / get ready", cat: "break" },
  { day: "thu", start: "07:50", end: "08:20", title: "Commute", cat: "break" },
  { day: "thu", start: "08:30", end: "15:15", title: "School", cat: "school" },
  { day: "thu", start: "15:15", end: "15:45", title: "Travel to tennis", cat: "break" },
  { day: "thu", start: "16:00", end: "18:00", title: "Tennis", cat: "sports" },
  { day: "thu", start: "18:00", end: "18:30", title: "Travel home", cat: "break" },
  { day: "thu", start: "18:30", end: "19:00", title: "Shower + dinner", cat: "break" },
  { day: "thu", start: "19:00", end: "20:00", title: "AoPS Number Theory", cat: "aops-math" },
  { day: "thu", start: "20:00", end: "21:00", title: "AoPS Python practice", cat: "aops-code" },

  // FRIDAY
  { day: "fri", start: "06:30", end: "07:00", title: "Home workout", cat: "sports" },
  { day: "fri", start: "07:00", end: "07:50", title: "Breakfast / get ready", cat: "break" },
  { day: "fri", start: "07:50", end: "08:20", title: "Commute", cat: "break" },
  { day: "fri", start: "08:30", end: "15:15", title: "School", cat: "school" },
  { day: "fri", start: "15:15", end: "15:45", title: "Commute home", cat: "break" },
  { day: "fri", start: "15:45", end: "17:00", title: "Signature homework", cat: "homework" },
  { day: "fri", start: "17:00", end: "17:30", title: "Break / dinner", cat: "break" },
  { day: "fri", start: "17:30", end: "19:30", title: "AoPS Number Theory (deep block)", cat: "aops-math" },
  { day: "fri", start: "19:30", end: "20:30", title: "Science Fair / ROBOTC", cat: "sci-robot" },
  { day: "fri", start: "20:30", end: "21:15", title: "Free time", cat: "break" },

  // SATURDAY
  { day: "sat", start: "09:00", end: "11:00", title: "AoPS Number Theory", cat: "aops-math" },
  { day: "sat", start: "11:00", end: "12:00", title: "Break / relax", cat: "break" },
  { day: "sat", start: "12:00", end: "13:00", title: "School homework / reading", cat: "homework" },
  { day: "sat", start: "13:00", end: "14:00", title: "Free / lunch", cat: "break" },
  { day: "sat", start: "14:00", end: "15:30", title: "AoPS Number Theory problems", cat: "aops-math" },
  { day: "sat", start: "15:30", end: "16:00", title: "Break", cat: "break" },
  { day: "sat", start: "16:00", end: "17:00", title: "Science Fair / ROBOTC", cat: "sci-robot" },

  // SUNDAY
  { day: "sun", start: "09:00", end: "10:30", title: "Plan week + homework", cat: "homework" },
  { day: "sun", start: "10:30", end: "12:00", title: "AoPS Number Theory review", cat: "aops-math" },
  { day: "sun", start: "12:00", end: "14:00", title: "Family / lunch / chill", cat: "break" },
  { day: "sun", start: "14:00", end: "15:00", title: "AoPS Number Theory (mock style)", cat: "aops-math" },
  { day: "sun", start: "15:00", end: "16:00", title: "Break", cat: "break" },
  { day: "sun", start: "16:00", end: "17:00", title: "Python practice or SciFair/ROBOTC", cat: "aops-code" },
];

// 3) Simple console check
console.log("Number of events this week:", events.length);

// ---------- Rendering calendar from data ----------

function renderDayFromData(dayKey, columnIndex) {
  const dayColumns = document.querySelectorAll(".calendar-day");
  if (columnIndex >= dayColumns.length) {
    console.warn("No calendar-day column at index", columnIndex);
    return;
  }

  const col = dayColumns[columnIndex];
  const body = col.querySelector(".calendar-day-body");
  if (!body) {
    console.warn("No .calendar-day-body found in column", columnIndex);
    return;
  }

  const dayEvents = events
    .filter((e) => e.day === dayKey)
    .sort((a, b) => (a.start > b.start ? 1 : -1));

  body.innerHTML = "";

  dayEvents.forEach((evt) => {
    const eventDiv = document.createElement("div");
    eventDiv.className = "event event-" + evt.cat;

    const timeDiv = document.createElement("div");
    timeDiv.className = "event-time";
    timeDiv.textContent = `${evt.start}–${evt.end}`;

    const titleDiv = document.createElement("div");
    titleDiv.className = "event-title";
    titleDiv.textContent = evt.title;

    eventDiv.appendChild(timeDiv);
    eventDiv.appendChild(titleDiv);
    body.appendChild(eventDiv);
  });
}

function renderAllDays() {
  days.forEach((day, index) => {
    renderDayFromData(day.key, index);
  });
}

// ---------- Notification helpers ----------

// Convert "HH:MM" to minutes after midnight
function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// Schedule notifications for *today's* events, 30 minutes before start
function scheduleNotificationsForToday() {
  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications.");
    return;
  }
  if (Notification.permission !== "granted") {
    console.log("Notification permission is not granted, skipping scheduling.");
    return;
  }

  const now = new Date();
  const weekdayIndex = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  const dayKeyMap = {
    0: "sun",
    1: "mon",
    2: "tue",
    3: "wed",
    4: "thu",
    5: "fri",
    6: "sat",
  };

  const todayKey = dayKeyMap[weekdayIndex];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const todaysEvents = events.filter((e) => e.day === todayKey);

  todaysEvents.forEach((e) => {
    const startMinutes = parseTimeToMinutes(e.start);
    const notifyMinutes = startMinutes - 30; // 30 minutes before
    const diffMinutes = notifyMinutes - nowMinutes;
    const diffMs = diffMinutes * 60 * 1000;

    // If the notify time is in the past, skip
    if (diffMs <= 0) {
      return;
    }

    // Optional: don't schedule super-far events (e.g., > 12 hours from now)
    if (diffMinutes > 12 * 60) {
      return;
    }

    console.log(
      `Scheduling notification for ${e.title} in ${diffMinutes} minutes`
    );

    setTimeout(() => {
      new Notification("Upcoming: " + e.title, {
        body: `${e.start}–${e.end}`,
        tag: `event-${todayKey}-${e.start}-${e.title}`,
      });
    }, diffMs);
  });
}

// Ask for notification permission, then schedule today's notifications
function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications.");
    return;
  }

  if (Notification.permission === "granted") {
    // Already allowed
    scheduleNotificationsForToday();
  } else if (Notification.permission === "default") {
    // Ask the user
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        scheduleNotificationsForToday();
      } else {
        console.log("Notifications not allowed by the user.");
      }
    });
  } else {
    // "denied"
    console.log("User has denied notifications previously.");
  }
}

// ---------- Run on page load ----------

renderAllDays();
requestNotificationPermission();
