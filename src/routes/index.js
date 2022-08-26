import { lazy } from "react";
import CouponTable from "../pages/CouponTable";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AddProducts = lazy(() => import("../pages/AddProducts"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Tables = lazy(() => import("../pages/Tables"));
const NewTables = lazy(() => import("../pages/NewTable"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const Logout = lazy(() => import("../pages/Logout"));
const Banners = lazy(() => import("../pages/Banners"));
<<<<<<< HEAD
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
=======
const AdminProfile = lazy(() => import("../pages/AdminProfile"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const NewBanner = lazy(() => import("../pages/NewBanner"));
>>>>>>> 786caa1a37a84e05bdce8455ca8c963320431595
const IndividualDetails = lazy(() => import("../pages/IndividualDetails"));
// const AddBanners = lazy(() => import("../pages/AddBanners"));
const CouponCodes = lazy(() => import("../pages/CouponCodes"));
const OrderList = lazy(() => import("../pages/OrderList"));
const ProductList = lazy(() => import("../pages/ProductList"));


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
    path: "/CouponCodes", // the url
    component: CouponCodes, // view rendered
  },
  {
    path: "/couponTable", // the url
    component: CouponTable, // view rendered
  },
  {
    path: "/productList", // the url
    component: ProductList, // view rendered
  },
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/addProducts",
    component: AddProducts,
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
    path: "/changePassword",
    component: ChangePassword,
  },
  {
    path: "/banners",
    component: Banners,
  },
  {
    path: "/newBanner",
    component: NewBanner,
  },
  {
    path: "/adminProfile",
    component: AdminProfile,
  },
  {
    path: "/changePassword",
    component: ChangePassword,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
<<<<<<< HEAD
    path: "/orderlist",
    component: OrderList,
=======
    path: "/newTables",
    component: NewTables,
>>>>>>> 786caa1a37a84e05bdce8455ca8c963320431595
  },
  {
    path: "/individualDetails/:id",
    component: IndividualDetails,
  },
  // {
  //   path: "/addBanner",
  //   component: AddBanners,
  // },
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
