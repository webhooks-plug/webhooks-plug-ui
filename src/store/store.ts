import { create } from "zustand";
import { servicesStore } from "./servicesStore";
import { IStore } from "@/interfaces/store";
import { eventTypesStore } from "./eventTypesStore";
import { usersStore } from "./usersStore";
import { subscriptionsStore } from "./subscriptionsStore";
import { messagesStore } from "./messagesStore";

const useStore = create<IStore>()((set, get) => {
  const toPass = {
    get,
    set,
  };

  const state = {
    services: servicesStore(toPass),
    users: usersStore(toPass),
    subscriptions: subscriptionsStore(toPass),
    eventTypes: eventTypesStore(toPass),
    messages: messagesStore(toPass),
  };

  return state;
});

export { useStore };
