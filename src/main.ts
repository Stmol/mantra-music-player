import "./app/styles/global.css";
import { mount } from "svelte";
import App from "./app/app.svelte";

const appTarget = document.querySelector<HTMLElement>("#app");

if (!appTarget) {
  throw new Error("Application root element was not found.");
}

const app = mount(App, { target: appTarget });

export default app;
