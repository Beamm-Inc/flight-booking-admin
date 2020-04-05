import FlightList from "./FlightList.vue";
import FlightCreate from "./FlightCreate.vue";
import FlightUpdate from "./FlightUpdate.vue";

export default [
  {
    path: "flights",
    name: "flight-list",
    component: FlightList,
    meta: {
      allowedFlightRoles: ["Administrator"]
    }
  },
  {
    path: "flights/new",
    name: "flight-create",
    component: FlightCreate,
    meta: {
      allowedFlightRoles: ["Administrator"]
    }
  },
  {
    path: "flights/:flightId/update",
    name: "flight-update",
    component: FlightUpdate,
    meta: {
      allowedFlightRoles: ["Administrator"]
    }
  }
];
