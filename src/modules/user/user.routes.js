import UserList from "./UserList.vue";

export default [
  {
    path: "users",
    name: "user-list",
    component: UserList,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  }
];
