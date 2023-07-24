import create from 'zustand';
const initialorders = [
  {
    image: 'shirt.svg',
    item: 'Shirt',
    price: '30',
    quantity: 0,
  },
  {
    image: 'T-shirt.svg',
    item: 'T-Shirt',
    price: '25',
    quantity: 0,
  },
  {
    image: 'suit.svg',
    item: 'Suit',
    price: '80',
    quantity: 0,
  },
  {
    image: 'jeans.svg',
    item: 'Jeans',
    price: '50',
    quantity: 0,
  },
];

const useWashOrderStore = create((set) => ({
  washOrders: [...initialorders],
  incrementWashQuantity: (index) => {
    set((state) => {
      const updatedWashOrders = [...state.washOrders];
      ++updatedWashOrders[index].quantity;
      return { washOrders: updatedWashOrders };
    });
  },
  decrementQuantity: (index) => {
    set((state) => {
      const updatedWashOrders = [...state.washOrders];
      if (updatedWashOrders[index].quantity > 0) {
        --updatedWashOrders[index].quantity;
      }
      return { washOrders: updatedWashOrders };
    });
  },
}));

export default useWashOrderStore;
