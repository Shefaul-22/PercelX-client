import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Home/HomePage/Homepage";
import Covarage from "../pages/Covarage/Covarage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/AuthRelated/Login/Login";
import Register from "../pages/AuthRelated/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendPercel from "../pages/SendPercel/SendPercel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [

        {
            index: true, 
            Component: Homepage,
        },

        {
          path: "rider",
          element: <PrivateRoute><Rider></Rider></PrivateRoute>
        },

        {
          path: "send-parcel",
          element: <PrivateRoute><SendPercel></SendPercel></PrivateRoute>,
          loader: () => fetch('/serviceCenter.json').then(res => res.json())


        },

        {
          path: "coverage",
          Component: Covarage,
          loader: () => fetch('/serviceCenter.json').then(res => res.json())
        }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [

      {
        path: "login",
        Component: Login

      },


      {
        path: "register",
        Component: Register

      }
    ]
  }
]);