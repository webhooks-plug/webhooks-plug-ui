import WebPlug from "webplug";

const webplug = new WebPlug({
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY!,
  url: import.meta.env.VITE_REACT_APP_API_URL!,
});

export default webplug;
