import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, product, amount, color } = action.payload;
      const tempProduct = state.cart.find((p) => p.id === id + color);
      if (tempProduct) {
        const tempCart = state.cart.map((product) => {
          if (product.id === id + color) {
            let newAmount = product.amount + amount;
            console.log(product.max);

            if (newAmount > product.max) {
              newAmount = product.max;
            }
            return { ...product, amount: newAmount };
          } else {
            return product;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          color,
          amount,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case CLEAR_CART:
      return { ...state, cart: [] };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };

    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: ids, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === ids) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          } else {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });

      return { ...state, cart: tempCart };

    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.total_items = amount + total.total_items;
          total.total_amount = price * amount + total.total_amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );

      return { ...state, total_amount, total_items };

    default:
      return state;
  }
};

export default cart_reducer;
