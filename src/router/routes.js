import { Login, ForgotPassword } from "@/modules/account";
import AppLayout from "@/modules/layout";
import NotFoundPage from "@/components/NotFoundPage.vue";

import accountRoutes from "@/modules/account/account.routes";
import userRoutes from "@/modules/user/user.routes";
import airplaneRoutes from "@/modules/airplane/airplane.routes";
import airportRoutes from "@/modules/airport/airport.routes";

const routes = [
  {
    path: "/",
    redirect: "/app/users"
  },
  {
    path: "/app",
    component: AppLayout,
    children: [
      ...accountRoutes,
      ...userRoutes,
      ...airplaneRoutes,
      ...airportRoutes
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/forgot",
    name: "forgot",
    component: ForgotPassword
  },
  {
    path: "*",
    name: "not-found",
    component: NotFoundPage
  }
];
export default routes;
