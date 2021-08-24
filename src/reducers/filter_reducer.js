import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      const maxPrices = action.payload.map((p) => p.price);
      const maxPrice = Math.max(...maxPrices);
      return {
        ...state,
        filtered_products: [...action.payload],
        all_products: [...action.payload],
        filters: {
          ...state.filters,
          price: maxPrice,
          max_price: maxPrice,
        },
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };

    case SORT_PRODUCTS:
      const { filtered_products, sort } = state;
      let temp = [...filtered_products];
      if (sort === 'price-lowest') {
        temp = temp.sort((b, a) => b.price - a.price);
      }
      if (sort === 'price-highest') {
        temp = temp.sort((b, a) => a.price - b.price);
      }
      if (sort === 'name-a') {
        temp = temp.sort((b, a) => b.name.localeCompare(a.name));
      }
      if (sort === 'name-z') {
        temp = temp.sort((b, a) => a.name.localeCompare(b.name));
      }
      return {
        ...state,
        filtered_products: temp,
      };

    case FILTER_PRODUCTS:
      const { all_products, filtered_products: products } = state;
      const { text, price, shipping, color, category, company } = state.filters;

      let tempProducts = [...all_products];
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }

      if (category !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category;
        });
      }

      if (company !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company;
        });
      }

      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }

      tempProducts = tempProducts.filter((product) => product.price <= price);

      if (shipping) {
        tempProducts = tempProducts.filter((product) => {
          return product.shipping === true;
        });
      }

      return {
        ...state,
        filtered_products: tempProducts,
      };

    default:
      return state;
  }
};

export default filter_reducer;
