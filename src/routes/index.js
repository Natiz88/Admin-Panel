import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const Logout = lazy(() => import("../pages/Logout"));
const Banners = lazy(() => import("../pages/Banners"));
const IndividualDetails = lazy(() => import("../pages/IndividualDetails"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/forms",
    component: Forms,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/contactUs",
    component: ContactUs,
  },
  {
    path: "/banners",
    component: Banners,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/individualDetails/:id",
    component: IndividualDetails,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/logout",
    component: Logout,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
