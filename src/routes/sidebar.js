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
  {
    path: "/app/bill",
    icon: "FormsIcon",
    name: "Billing",
  },
  {
    icon: "PagesIcon",
    name: "Products",
    routes: [
      {
        path: "/app/ProductList",
        icon: "TablesIcon",
        name: "Product List",
      },
      {
        path: "/app/addProducts",
        icon: "FormsIcon",
        name: "Add Product",
      },
    ],
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
  //,
  {
    icon: "PagesIcon",
    name: "Users",
    routes: [
      { path: "/app/tables", icon: "TablesIcon", name: "Users Table" },
      {
        path: "/app/individualDetails/-1",
        icon: "FormIcon",
        name: "Add Users",
      },
    ],
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
  
  // {
  //   path: "/app/view/:id",
  //   icon: "CardsIcon",
  //   name: "View",
  // },
];

export default routes;
