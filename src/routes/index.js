import Login from "../pages/Login/index";
import Product from "../pages/Product";
import Category from "../pages/Category";
import Warehouse from '../pages/Warehouse'
import Promotion from "../pages/Promotion";
import DetailProduct from "../pages/Detail_Product";
import Users from "../pages/Users";
import AddProduct from "../pages/Add_Product";
import AddUser from "../pages/Add_User";
import DetailUser from "../pages/Detail_User";

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
  {
    path: "/detail-product",
    component: DetailProduct,
    layout: "MainLayout",
  },
  {
    path: "/users",
    component: Users,
    layout: "MainLayout",
  },
  {
    path: "/add-product",
    component: AddProduct,
    layout: "MainLayout",
  },
  {
    path: "/add-user",
    component: AddUser,
    layout: "MainLayout",
  },
  {
    path: "/detail-user",
    component: DetailUser,
    layout: "MainLayout",
  },
];

const pubicRoutes = [];

export { privateRoutes, pubicRoutes };
