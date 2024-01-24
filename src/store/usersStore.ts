import { IStore, IStoreParam, IUsersStore } from "@/interfaces/store";
import { updateState } from "@/lib/store";
import { fetchUsers } from "@/services/users";

const updateFunction = (state: IStore, updatedState: Partial<IUsersStore>) => {
  return updateState<IUsersStore>(state, "users", updatedState);
};

export const usersStore = ({ set, get }: IStoreParam) => {
  return {
    users: [],
    loading: false,
    setLoading: (loading: boolean) => {
      set((state) => {
        return updateState<IUsersStore>(state, "users", {
          loading,
        });
      });
    },
    fetchUsers: async (serviceId: string) => {
      try {
        get().users.setLoading(true);
        const users = await fetchUsers(serviceId);

        set((state) => {
          return updateFunction(state, {
            users: users.data,
          });
        });
      } catch (err) {
        set((state) => {
          return updateFunction(state, {
            users: [],
          });
        });
      } finally {
        get().users.setLoading(false);
      }
    },
  };
};
