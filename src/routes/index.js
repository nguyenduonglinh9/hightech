import Login from "../pages/Login/index";
import Product from "../pages/Product";
import Category from "../pages/Category";
import Warehouse from '../pages/Warehouse'
import Promotion from "../pages/Promotion";

const privateRoutes = [
  {
    path: "/",
    component: Login,
    layout: null,
  },
  {
    path: "/product",
    component: Product,
    layout: "MainLayout",
  },
  {
    path: "/category",
    component: Category,
    layout: "MainLayout",
  },
  {
    path: "/warehouse",
    component: Warehouse,
    layout: "MainLayout",
  },
  {
    path: "/promotion",
    component: Promotion,
    layout: "MainLayout",
  },
];

const pubicRoutes = [];

export { privateRoutes, pubicRoutes };
