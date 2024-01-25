import webplug from "@/lib/webplug";

const createEventType = async (name: string, serviceId: string) => {
  const response = await webplug.eventTypes.create(name, serviceId);
  return response;
};

const fetchEventTypes = async (serviceId: string) => {
  const response = await webplug.eventTypes.all(serviceId);
  return response;
};

export { createEventType, fetchEventTypes };
