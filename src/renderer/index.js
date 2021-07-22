import React from "react";
import ReactDOM from "react-dom";
import thunkMidleware from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import {
    ConferenceRoom,
    VoxeetProvider,
    reducer as voxeetReducer,
} from "@voxeet/react-components";

// Import Style
import "@voxeet/react-components/dist/voxeet-react-components.css"; // Can you be customize, refer to https://github.com/voxeet/voxeet-assets-react-components

const reducers = combineReducers({
    voxeet: voxeetReducer,
});

const configureStore = () =>
    createStore(reducers, applyMiddleware(thunkMidleware));

const settings = {
    consumerKey: `${process.env.CKEY}`,
    consumerSecret: `${process.env.CSEC}`,
    conferenceAlias: "Sample",
};

let accessToken, refreshToken;


ReactDOM.render(
    <VoxeetProvider store={configureStore()}>
        <ConferenceRoom
            isWidget={false}
            autoJoin={true}
            preConfig={true}
            isElectron={true}
            displayModes={["tiles", "speaker"]}
            consumerKey={settings.consumerKey}
            consumerSecret={settings.consumerSecret}
            conferenceAlias={settings.conferenceAlias}
        />
    </VoxeetProvider>,
    document.getElementById("app")
);
