import "../styles/globals.css";
import React from "react";
import Home from "../components/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Apropos from "./apropos";
import Ressources from "./ressources";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import user from "../reducers/user";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ user });
const persistConfig = { key: "Coconut", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
     <Provider store={store}>
     <PersistGate persistor={persistor}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      </PersistGate>
    </Provider>
    </>
  );
}

export default App;
