import webplug from "@/lib/webplug";

const fetchMessages = async () => {
  const response = await webplug.messages.all();
  return response.data;
};

export { fetchMessages };
