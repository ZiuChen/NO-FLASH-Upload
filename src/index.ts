import { createApp } from "vue";
import App from "./components/Main.vue";
import router from './route'

document.querySelectorAll("head link, head script").forEach((n: HTMLElement) => {
  n.remove();
});

document.querySelectorAll("html, body").forEach((n: HTMLBodyElement) => {
  n.style.margin = "0"
})

createApp(App)
.use(router)
.mount("body");
