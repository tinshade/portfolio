import { useEffect } from "react";
import moment from "moment-timezone";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//* State Components
import { useSelector, useDispatch } from "react-redux";
import { setInitialized } from "./store/features/app/appSlice";

//* UI Components
import Home from "./pages/Home/Home";
import NotFoundPage from "./pages/404/NotFound";

moment.tz.setDefault();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
]);

function App() {
  const { isInitialized, user } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInitialized) {
      dispatch(setInitialized());
    }
    // eslint-disable-next-line
  }, [isInitialized]);

  if (!user) {
    console.log("Proceeding with Anonymous Login");
  }
  return <RouterProvider router={router} />;
}

export default App;
