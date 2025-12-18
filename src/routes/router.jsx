import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Home/HomePage/Homepage";
import Covarage from "../pages/Covarage/Covarage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/AuthRelated/Login/Login";
import Register from "../pages/AuthRelated/Register/Register";

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