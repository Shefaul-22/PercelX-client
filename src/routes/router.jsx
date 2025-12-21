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
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

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
  },

  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [

      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment
      },
      {
        path: "payment-success",
        Component: PaymentSuccess
      },

      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory
      }
    ]
  }
]);