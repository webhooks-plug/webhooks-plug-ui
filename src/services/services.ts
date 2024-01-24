import webplug from "@/lib/webplug";

const fetchServices = async () => {
  const response = await webplug.services.all();
  return response.data;
};

const getUsersCount = async (id: string) => {
  const response = await webplug.services.usersCount(id);
  return response.data;
};

export { fetchServices, getUsersCount };
