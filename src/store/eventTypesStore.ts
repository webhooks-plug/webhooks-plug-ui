import { IEventTypesStore, IStore, IStoreParam } from "@/interfaces/store";
import { updateState } from "@/lib/store";
import { fetchEventTypes } from "@/services/eventTypes";

const updateFunction = (
  state: IStore,
  updatedState: Partial<IEventTypesStore>
) => {
  return updateState<IEventTypesStore>(state, "eventTypes", updatedState);
};

export const eventTypesStore = ({ set, get }: IStoreParam) => {
  return {
    eventTypes: [],
    loading: false,
    setLoading: (loading: boolean) => {
      set((state) => {
        return updateFunction(state, {
          loading,
        });
      });
    },
    fetchEventTypes: async (serviceId: string) => {
      try {
        get().eventTypes.setLoading(true);
        const eventTypes = await fetchEventTypes(serviceId);

        set((state) => {
          return updateFunction(state, {
            eventTypes: eventTypes.data,
          });
        });
      } catch (err) {
        set((state) => {
          return updateFunction(state, {
            eventTypes: [],
          });
        });
      } finally {
        get().eventTypes.setLoading(false);
      }
    },
  };
};
