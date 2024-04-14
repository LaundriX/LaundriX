import { create } from 'zustand';
import PowerCleanList from '../../TempData/PowerCleanList';
import WashList from '../../TempData/WashList';
import DryCleanList from '../../TempData/DryCleanList';
import moment from 'moment';

const order = [[WashList, PowerCleanList, DryCleanList]];
const useOrderStore = create((set) => ({
  Orders: [...order],
  Total: 0,
  Phone: 0,
  pickupDate: '',
  deliveryDate: '-- -- --',
  pickupTime: '',
  deliveryTime: '',
  isAuth: false,
  userEmail: '',
  userName: '',
  pickupAddress: '',
  dropAddress: '',

  setUserEmail: (value) => {
    set((state) => {
      return {
        ...state,
        userEmail: value,
      };
    });
  },

  setUserName: (value) => {
    set((state) => {
      return {
        ...state,
        userName: value,
      };
    });
  },

  setUserPhone: (value) => {
    set((state) => {
      return { ...state, Phone: value };
    });
  },

  addAuth: () => {
    set((state) => {
      return { ...state, isAuth: true };
    });
  },

  removeAuth: () => {
    set((state) => {
      return { ...state, isAuth: false };
    });
  },

  setPickupDate: (value) => {
    set((state) => {
      if (value === 'Today')
        return {
          ...state,
          pickupDate: moment().format('Do MMM YYYY'),
          deliveryDate: moment().add(2, 'days').format('ddd, D MMM YYYY'),
        };
      if (value === 'Tomorrow')
        return {
          ...state,
          pickupDate: moment().add(1, 'days').format('ddd, D MMM YYYY'),
          deliveryDate: moment().add(3, 'days').format('ddd, D MMM YYYY'),
        };
      return {
        ...state,
        pickupDate: moment().add(2, 'days').format('ddd, D MMM YYYY'),
        deliveryDate: moment().add(4, 'days').format('ddd, D MMM YYYY'),
      };
    });
  },

  setPickupTime: (value) => {
    set((state) => {
      return { ...state, pickupTime: value };
    });
  },

  setDeliveryTime: (value) => {
    set((state) => {
      return { ...state, deliveryTime: value };
    });
  },

  setPickupAddress: (value) => {
    set((state) => {
      return { ...state, pickupAddress: value };
    });
  },

  setDropAddress: (value) => {
    set((state) => {
      return { ...state, dropAddress: value };
    });
  },

  setTotal: (value) => {
    set((state) => {
      return { ...state, Total: value };
    });
  },

  // Orders[0][0][0].quantity
  incrementQuantity: (orderIndex, itemIndex) => {
    set((state) => {
      const updatedOrders = [...state.Orders];
      ++updatedOrders[0][orderIndex][itemIndex].quantity;
      state.setTotal(
        state.Total + updatedOrders[0][orderIndex][itemIndex].price
      );
      return { Orders: updatedOrders };
    });
  },

  decrementQuantity: (orderIndex, itemIndex) => {
    set((state) => {
      const updatedOrders = [...state.Orders];
      if (updatedOrders[0][orderIndex][itemIndex].quantity > 0) {
        --updatedOrders[0][orderIndex][itemIndex].quantity;
        state.setTotal(
          state.Total - updatedOrders[0][orderIndex][itemIndex].price
        );
      }
      return { Orders: updatedOrders };
    });
  },
}));

export default useOrderStore;
