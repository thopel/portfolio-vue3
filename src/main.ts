import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import du routeur
import "./style.scss";

const app = createApp(App);

app.use(router); // Utiliser Vue Router

app.mount("#app");
