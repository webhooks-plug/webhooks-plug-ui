import { IService } from "@/interfaces/services";
import { IServicesStore, IStore, IStoreParam } from "@/interfaces/store";
import { updateState } from "@/lib/store";
import { fetchServices, getUsersCount } from "@/services/services";

const updateFunction = (
  state: IStore,
  updatedState: Partial<IServicesStore>
) => {
  return updateState<IServicesStore>(state, "services", updatedState);
};

export const servicesStore = ({ set, get }: IStoreParam) => {
  return {
    services: [],
    loading: false,
    currentService: null,
    usersCount: 0,
    setLoading: (loading: boolean) => {
      set((state) => {
        return updateFunction(state, {
          loading,
        });
      });
    },
    setCurrentService: async (service: IService) => {
      const usersCount = await getUsersCount(service.id);
      const count = usersCount[0].count;

      set((state) => {
        return updateFunction(state, {
          currentService: service,
          usersCount: count,
        });
      });
    },
    fetchServices: async () => {
      try {
        get().services.setLoading(true);
        const services = await fetchServices();

        set((state) => {
          return updateFunction(state, {
            services,
          });
        });
      } catch (err) {
        set((state) => {
          return updateFunction(state, {
            services: [],
          });
        });
      } finally {
        get().services.setLoading(false);
      }
    },
  };
};
