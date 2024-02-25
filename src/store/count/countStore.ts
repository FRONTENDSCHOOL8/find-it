import { create } from 'zustand';

interface StoreState {
  count: number;
}

interface StoreActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

type Store = StoreState & StoreActions;

const useCountStore = create<Store>((set) => ({
  count: 9,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCountStore;
