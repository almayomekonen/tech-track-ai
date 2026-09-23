export const tracks = {
  userPreferences: {
    title: "User Preferences",
    summary:
      "Understand preferred temperatures, lighting, rooms, and household schedules.",
    skills: [
      "Remember comfort preferences",
      "Apply preferred device settings",
      "Understand household schedules",
    ],
  },
  smartHomeDevices: {
    title: "Smart Home Devices",
    summary:
      "Understand device names, locations, capabilities, and current states.",
    skills: [
      "Identify devices by room",
      "Check device status",
      "Control lights and thermostats",
      "Read home sensors",
    ],
  },
  tasksAndRoutines: {
    title: "Tasks and Routines",
    summary:
      "Understand home actions, scenes, schedules, and automation triggers.",
    skills: [
      "Activate home scenes",
      "Schedule device actions",
      "Manage home routines",
      "Check action results",
    ],
  },
};

export type TrackId = keyof typeof tracks;
