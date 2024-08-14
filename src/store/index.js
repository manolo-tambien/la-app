import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from './session';
// import { devicesReducer } from './devices';
// import { historicsReducer } from './historics';
// import { alertsReducer } from "./alerts";
// import { requestsReducer } from "./requests";

export { sessionActions } from './session';

export default configureStore({
  reducer: {
    session: sessionReducer,
    // devices: devicesReducer,
    // historics: historicsReducer,
    // alerts : alertsReducer,
    // requests: requestsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
