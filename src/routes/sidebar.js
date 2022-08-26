/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  // {
  //   path: "/app/addProducts",
  //   icon: "FormsIcon",
  //   name: "Add Products",
  // },
  {
    path: "/app/ProductList",
    icon: "FormsIcon",
    name: "Product List",
  },
  {
    path: "/app/cards",
    icon: "CardsIcon",
    name: "Cards",
  },
  {
    path: "/app/charts",
    icon: "ChartsIcon",
    name: "Charts",
  },
  {
    path: "/app/buttons",
    icon: "ButtonsIcon",
    name: "Buttons",
  },
  {
    path: "/app/ContactUs",
    icon: "ModalsIcon",
    name: "Contact Us",
  },
  {
    path: "/app/banners",
    icon: "ModalsIcon",
    name: "Banners",
  },
  {
    path: "/app/couponTable",
    icon: "CardsIcon",
    name: "Coupon Table",
  },
  // {
  //   path: "/app/CouponCodes",
  //   icon: "CardsIcon",
  //   name: "Coupon Codes",
  // },
  //,
  {
    path: "/app/tables",
    icon: "TablesIcon",
    name: "Users",
  },
  {
    path: "/app/orderList",
    icon: "TablesIcon",
    name: "Order List",
  },
  {
    icon: "PagesIcon",
    name: "Pages",
    routes: [
      // submenu
      {
        path: "/login",
        name: "Login",
      },
      {
        path: "/create-account",
        name: "Create account",
      },
      {
        path: "/forgot-password",
        name: "Forgot password",
      },
      {
        path: "/app/404",
        name: "404",
      },
      {
        path: "/app/blank",
        name: "Blank",
      },
    ],
  },
];

export default routes;
