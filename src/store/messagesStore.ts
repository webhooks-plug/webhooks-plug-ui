import { IMessagesStore, IStore, IStoreParam } from "@/interfaces/store";
import { updateState } from "@/lib/store";
import { fetchMessages } from "@/services/messages";

const updateFunction = (
  state: IStore,
  updatedState: Partial<IMessagesStore>
) => {
  return updateState<IMessagesStore>(state, "messages", updatedState);
};

export const messagesStore = ({ set, get }: IStoreParam) => {
  return {
    messages: [],
    loading: false,
    setLoading: (loading: boolean) => {
      set((state) => {
        return updateFunction(state, {
          loading,
        });
      });
    },
    fetchMessages: async () => {
      try {
        get().messages.setLoading(true);
        const messages = await fetchMessages();

        set((state) => {
          return updateFunction(state, {
            messages,
          });
        });
      } catch (err) {
        set((state) => {
          return updateFunction(state, {
            messages: [],
          });
        });
      } finally {
        get().messages.setLoading(false);
      }
    },
  };
};
