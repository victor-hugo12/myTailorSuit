import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { selectionsReducer } from "./selections/selections.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// 1️⃣ Configuración del persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["selections"], // solo persistimos este reducer
};

// 2️⃣ Combinar reducers y aplicar persist
const rootReducer = combineReducers({
  selections: selectionsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3️⃣ Crear store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // necesario para redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 4️⃣ Crear persistor para envolver tu app
export const persistor = persistStore(store);
