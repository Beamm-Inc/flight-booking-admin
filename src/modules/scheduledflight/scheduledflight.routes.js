import ScheduledflightList from "./ScheduledflightList.vue";
import ScheduledflightCreate from "./ScheduledflightCreate.vue";
import ScheduledflightUpdate from "./ScheduledflightUpdate.vue";

export default [
  {
    path: "scheduledflights",
    name: "scheduledflight-list",
    component: ScheduledflightList,
    meta: {
      allowedScheduledflightRoles: ["Administrator"]
    }
  },
  {
    path: "scheduledflights/new",
    name: "scheduledflight-create",
    component: ScheduledflightCreate,
    meta: {
      allowedScheduledflightRoles: ["Administrator"]
    }
  },
  {
    path: "scheduledflights/:scheduledflightId/update",
    name: "scheduledflight-update",
    component: ScheduledflightUpdate,
    meta: {
      allowedScheduledflightRoles: ["Administrator"]
    }
  }
];
