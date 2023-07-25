import create from 'zustand';
import PowerCleanList from '../../TempData/PowerCleanList';
import WashList from '../../TempData/WashList';
import DryCleanList from '../../TempData/DryCleanList';

const order = [[WashList, PowerCleanList, DryCleanList]];
const useOrderStore = create((set) => ({
  Orders: [...order],

  // Orders[0][0][0].quantity
  incrementQuantity: (orderIndex, itemIndex) => {
    set((state) => {
      const updatedOrders = [...state.Orders];
      ++updatedOrders[0][orderIndex][itemIndex].quantity;
      return { Orders: updatedOrders };
    });
  },

  decrementQuantity: (orderIndex, itemIndex) => {
    set((state) => {
      const updatedOrders = [...state.Orders];
      if (updatedOrders[0][orderIndex][itemIndex].quantity > 0) {
        --updatedOrders[0][orderIndex][itemIndex].quantity;
      }
      return { Orders: updatedOrders };
    });
  },
}));

export default useOrderStore;
