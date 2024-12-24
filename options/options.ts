import { createPinia } from "pinia";
import { createApp } from "vue";
import Options from "./Options.vue";

const app = createApp(Options);
const pinia = createPinia();

app.use(pinia);
app.mount("#app");
