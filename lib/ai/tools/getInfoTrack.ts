import { tool } from "@openai/agents";
import { z } from "zod";
import { tracks } from "../data/tracks";

export const getInfoTrack = tool({
  name: "get_info_track",
  description: "",
  parameters: z.object({
    track: z.enum(["userPreferences", "smartHomeDevices", "tasksAndRoutines"]),
  }),
  execute: async ({ track }) => {
    console.log("Track has been executed");
    return tracks[track];
  },
});
