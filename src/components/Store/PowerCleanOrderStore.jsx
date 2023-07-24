import create from 'zustand';
const initialorders = [
  {
    image: 'shirt.svg',
    item: 'Shirt',
    price: 25,
    quantity: 0,
  },
  {
    image: 'T-shirt.svg',
    item: 'T-Shirt',
    price: 20,
    quantity: 0,
  },
  {
    image: 'suit.svg',
    item: 'Suit',
    price: 40,
    quantity: 0,
  },
  {
    image: 'jeans.svg',
    item: 'Jeans',
    price: 30,
    quantity: 0,
  },
];

const usePowerCleanOrderStore = create((set) => ({
  powerCleanOrders: [...initialorders],
  incrementPowerCleanQuantity: (index) => {
    set((state) => {
      const updatedPowerCleanOrders = [...state.powerCleanOrders];
      ++updatedPowerCleanOrders[index].quantity;
      return { powerCleanOrders: updatedPowerCleanOrders };
    });
  },
  decrementPowerCleanQuantity: (index) => {
    set((state) => {
      const updatedPowerCleanOrders = [...state.powerCleanOrders];
      if (updatedPowerCleanOrders[index].quantity > 0) {
        --updatedPowerCleanOrders[index].quantity;
      }
      return { powerCleanOrders: updatedPowerCleanOrders };
    });
  },
}));

export default usePowerCleanOrderStore;
