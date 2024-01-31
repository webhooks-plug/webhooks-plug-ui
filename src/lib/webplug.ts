import WebPlug from "webplug";

const webplug = new WebPlug({
  apiKey: process.env.REACT_APP_API_KEY!,
  url: process.env.REACT_APP_API_URL!,
});

export default webplug;
