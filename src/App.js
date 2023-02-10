import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";

import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";

import "./default.scss";

const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }

      this.setState({
        ...initialState,
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <div className="main">
          <Routes>
            <Route
              path="*"
              element={
                <HomepageLayout currentUser={currentUser}>
                  <Homepage />
                </HomepageLayout>
              }
            />
            <Route
              path="/register"
              element={
                currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <MainLayout currentUser={currentUser}>
                    <Registration />
                  </MainLayout>
                )
              }
            />
            <Route
              path="/login"
              element={
                currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <MainLayout currentUser={currentUser}>
                    <Login />
                  </MainLayout>
                )
              }
            />
            <Route
              path="/recovery"
              element={
                currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <MainLayout currentUser={currentUser}>
                    <Recovery />
                  </MainLayout>
                )
              }
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
