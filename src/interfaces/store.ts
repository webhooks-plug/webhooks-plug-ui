import { IService } from "./services";
import { IEventType } from "./eventTypes";
import { IUser } from "./users";
import { ISubscriptionUser } from "./subscriptions";
import { IMessage } from "./messages";

export type ISet = (
  partial:
    | IStore
    | Partial<IStore>
    | ((state: IStore) => IStore | Partial<IStore>),
  replace?: boolean | undefined
) => void;

export type IGet = () => IStore;

export type IStoreParam = {
  set: ISet;
  get: IGet;
};

export interface IServicesStore {
  loading: boolean;
  usersCount: number;
  currentService: null | IService;
  services: IService[];
  setLoading: (loading: boolean) => void;
  fetchServices: () => Promise<void>;
  setCurrentService: (service: IService) => void;
}

export interface IEventTypesStore {
  loading: boolean;
  eventTypes: IEventType[];
  setLoading: (loading: boolean) => void;
  fetchEventTypes: (serviceId: string) => Promise<void>;
}

export interface IUsersStore {
  loading: boolean;
  users: IUser[];
  setLoading: (loading: boolean) => void;
  fetchUsers: (serviceId: string) => Promise<void>;
}

export interface ISubscriptionsStore {
  loading: boolean;
  subscriptions: ISubscriptionUser[];
  setLoading: (loading: boolean) => void;
  fetchSubscriptions: (userId: string) => Promise<void>;
}

export interface IMessagesStore {
  loading: boolean;
  messages: IMessage[];
  setLoading: (loading: boolean) => void;
  fetchMessages: () => Promise<void>;
}

export interface IStore {
  services: IServicesStore;
  users: IUsersStore;
  messages: IMessagesStore;
  subscriptions: ISubscriptionsStore;
  eventTypes: IEventTypesStore;
}
