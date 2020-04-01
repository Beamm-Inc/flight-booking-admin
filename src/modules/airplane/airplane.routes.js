import AirplaneList from "./AirplaneList.vue";
import AirplaneCreate from "./AirplaneCreate.vue";
import AirplaneUpdate from "./AirplaneUpdate.vue";

export default [
  {
    path: "airplanes",
    name: "airplane-list",
    component: AirplaneList,
    meta: {
      allowedAirplaneRoles: ["Administrator"]
    }
  },
  {
    path: "airplanes/new",
    name: "airplane-create",
    component: AirplaneCreate,
    meta: {
      allowedAirplaneRoles: ["Administrator"]
    }
  },
  {
    path: "airplanes/:airplaneId/update",
    name: "airplane-update",
    component: AirplaneUpdate,
    meta: {
      allowedAirplaneRoles: ["Administrator"]
    }
  }
];
