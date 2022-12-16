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
import Brand from "../pages/Brand";
import Orders from "../pages/Orders";
import ProductsSold from "../pages/Products_Sold";
import Revuene from "../pages/Revuene";
import DetailOrder from "../pages/Detail_Order";
import Account from "../pages/Account";
import Coupon from "../pages/Coupon";

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
    path: "/brand",
    component: Brand,
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
  {
    path: "/orders",
    component: Orders,
    layout: "MainLayout",
  },
  {
    path: "/products-sold",
    component: ProductsSold,
    layout: "MainLayout",
  },
  {
    path: "/revuene",
    component: Revuene,
    layout: "MainLayout",
  },
  {
    path: "/detail-order",
    component: DetailOrder,
    layout: "MainLayout",
  },
  {
    path: "/account",
    component: Account,
    layout: "MainLayout",
  },
  {
    path: "/coupon",
    component: Coupon,
    layout: "MainLayout",
  },
];

const pubicRoutes = [];

export { privateRoutes, pubicRoutes };
