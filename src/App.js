import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";

// hoc
import WithAuth from "./hoc/withAuth";

// layout
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard"

// style
import "./default.scss";



const App = props => {
  const { setCurrentUser, currentUser } = props;
  
  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      }

      setCurrentUser(userAuth);
    });
    
    return () => {
      authListener();
    };
  }, [setCurrentUser])

    return (
      <div className="App">
        <div className="main">
          <Routes>
            <Route
              path="*"
              element={
                <HomepageLayout>
                  <Homepage />
                </HomepageLayout>
              }
            />
            <Route
              path="/register"
              element={
                  <MainLayout>
                    <Registration />
                  </MainLayout>
              }
            />
            <Route
              path="/login"
              element={
                  <MainLayout>
                    <Login />
                  </MainLayout>
              }
            />
            <Route
              path="/recovery"
              element={
                currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <MainLayout>
                    <Recovery />
                  </MainLayout>
                )
              }
            />
            <Route
              path="/profil"
              element={
                currentUser ? (
                  <WithAuth>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </WithAuth>
                ) : (
                    currentUser === null ? <Navigate to="/login" /> : null
                  )
              }
            />
          </Routes>
        </div>
      </div>
    );
  }

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToPorps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToPorps)(App);
