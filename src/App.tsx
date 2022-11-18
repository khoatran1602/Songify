import React, { useEffect } from "react";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";
import "./index.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { userLoggedIn, userNotLoggedIn } from "./store/user.slice";
import { useUpdateUserMutation } from "./store/userapi.slice";
import { getAppUserFromFirebaseUser } from "./components/utils";
import { firebaseAuth } from "./fb";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import PageNotFound from "./components/ErrorPage/PageNotFound";
import LandingPage from "./components/LandingPage";
import logo from "./logo.svg";
import loader from "./loader.svg";
import SongDetails from "./components/SongDetails";
import Artist from "./components/Artist";
import Search from "./components/Search/Search";
import FavoriteList from "./components/FavoriteList";
import TopCharts from "./components/TopCharts";

// const ButtonStyle = ({
//   children,
// }: {
//   children?: JSX.Element | JSX.Element[] | string;
// }) => {
//   return (
//     <span className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
//       {children}
//     </span>
//   );
// };

function App() {
  const [updateUser, result] = useUpdateUserMutation();
  const user = useAppSelector(
    (state: { user: { user: any } }) => state.user.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      async (firebaseUser) => {
        if (!firebaseUser) {
          dispatch(userNotLoggedIn());
          return;
        }
        const appUser = getAppUserFromFirebaseUser(firebaseUser);
        await updateUser(appUser);
        dispatch(userLoggedIn(appUser));
      },
      (e) => {
        console.error(e);
        // handle no internet connection
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch, updateUser]);

  if (user === undefined) {
    return <LoadingScreen msg="Authenticating..." />;
  }

  if (result.isLoading) {
    return <LoadingScreen msg="Syncing..." />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/userList" element={<FavoriteList />} />
        <Route path="/songs/:songid" element={<SongDetails />} />
        <Route path="/topCharts" element={<TopCharts />} />
        <Route path="/artists/:id" element={<Artist />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
export { logo, loader };
