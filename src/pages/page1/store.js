import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create()(
  immer((set) => ({
    count: 0,
    setCount: (newCount) =>
      set((state) => {
        state.count = newCount;
      }),
  }))
);

export default useStore;
