import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import InstantSearch from 'vue-instantsearch/vue3/es';
import 'instantsearch.css/themes/reset.css';
// or include the full Satellite theme
import 'instantsearch.css/themes/satellite.css';
let app;
onAuthStateChanged(auth, (user) => {
	if (!app) {
		app = createApp(App).use(router).use(InstantSearch).mount("#app");
	}
});
