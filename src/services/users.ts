import webplug from "@/lib/webplug";

const createUser = async (name: string, serviceId: string) => {
  const response = await webplug.users.create(name, serviceId);
  return response;
};

const fetchUsers = async (serviceId: string) => {
  const response = await webplug.users.all(serviceId);
  return response;
};

export { createUser, fetchUsers };
