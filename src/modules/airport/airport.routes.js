import AirportList from "./AirportList.vue";
import AirportCreate from "./AirportCreate.vue";
import AirportUpdate from "./AirportUpdate.vue";

export default [
  {
    path: "airports",
    name: "airport-list",
    component: AirportList,
    meta: {
      allowedAirportRoles: ["Administrator"]
    }
  },
  {
    path: "airports/new",
    name: "airport-create",
    component: AirportCreate,
    meta: {
      allowedAirportRoles: ["Administrator"]
    }
  },
  {
    path: "airports/:airportId/update",
    name: "airport-update",
    component: AirportUpdate,
    meta: {
      allowedAirportRoles: ["Administrator"]
    }
  }
];
