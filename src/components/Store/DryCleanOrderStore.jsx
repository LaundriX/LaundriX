import create from 'zustand';
const initialorders = [
  {
    image: 'shirt.svg',
    item: 'Shirt',
    price: 30,
    quantity: 0,
  },
  {
    image: 'T-shirt.svg',
    item: 'T-Shirt',
    price: 25,
    quantity: 0,
  },
  {
    image: 'suit.svg',
    item: 'Suit',
    price: 80,
    quantity: 0,
  },
  {
    image: 'jeans.svg',
    item: 'Jeans',
    price: 50,
    quantity: 0,
  },
];

const useDryCleanOrderStore = create((set) => ({
  dryCleanOrders: [...initialorders],
  incrementDryCleanQuantity: (index) => {
    set((state) => {
      const updatedDryCleanOrders = [...state.dryCleanOrders];
      ++updatedDryCleanOrders[index].quantity;
      return { dryCleanOrders: updatedDryCleanOrders };
    });
  },
  decrementDryCleanQuantity: (index) => {
    set((state) => {
      const updatedDryCleanOrders = [...state.dryCleanOrders];
      if (updatedDryCleanOrders[index].quantity > 0) {
        --updatedDryCleanOrders[index].quantity;
      }
      return { dryCleanOrders: updatedDryCleanOrders };
    });
  },
}));

export default useDryCleanOrderStore;
