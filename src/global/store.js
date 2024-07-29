import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const initialUserInfo = {
  name: 'ry',
  sign: '',
  portrait: '',
};

const useCreatorStore = create()(
  immer((set) => ({
    userInfo: { ...initialUserInfo },
    setUserInfo: (userInfo) =>
      set((state) => {
        state.userInfo = { ...state.userInfo, ...userInfo };
      }),
  }))
);

export default useCreatorStore;
