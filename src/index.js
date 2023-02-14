
import React from "react";
import App from "./App";
import "./index.scss";

import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);

const client_id = process.env.REACT_APP_CLIENT_ID

root.render(
	<GoogleOAuthProvider clientId={client_id}>
		<App />	
	</GoogleOAuthProvider>
)