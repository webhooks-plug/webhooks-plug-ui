import { IStore, IStoreParam, ISubscriptionsStore } from "@/interfaces/store";
import { updateState } from "@/lib/store";
import { fetchSubscriptions } from "@/services/subscriptions";

const updateFunction = (
  state: IStore,
  updatedState: Partial<ISubscriptionsStore>
) => {
  return updateState<ISubscriptionsStore>(state, "subscriptions", updatedState);
};

export const subscriptionsStore = ({ set, get }: IStoreParam) => {
  return {
    subscriptions: [],
    loading: false,
    setLoading: (loading: boolean) => {
      set((state) => {
        return updateFunction(state, {
          loading,
        });
      });
    },
    fetchSubscriptions: async (userId: string) => {
      try {
        get().subscriptions.setLoading(true);
        console.log("subscriptions");
        const subscriptions = await fetchSubscriptions(userId);

        set((state) => {
          return updateFunction(state, {
            subscriptions,
          });
        });
      } catch (err) {
        console.log(err);
        set((state) => {
          return updateFunction(state, {
            subscriptions: [],
          });
        });
      } finally {
        get().subscriptions.setLoading(false);
      }
    },
  };
};
