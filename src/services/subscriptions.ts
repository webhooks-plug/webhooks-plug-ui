import webplug from "@/lib/webplug";

const createSubscription = async (
  eventTypeName: string,
  endpointUrl: string,
  userId: string
) => {
  const response = await webplug.subscriptions.create(
    eventTypeName,
    endpointUrl,
    userId
  );
  return response;
};

const fetchSubscriptions = async (userId: string) => {
  const response = await webplug.subscriptions.allForUser(userId);
  return response.data;
};

export { createSubscription, fetchSubscriptions };
