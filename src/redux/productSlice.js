import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/apiURL';
import { STATUS } from './status';

const productSlice = createSlice({
   name: 'product',
   initialState: {
      data: [],
      status: STATUS.IDLE,
   },
   reducers: {
      setProduct(state, action) {
         state.data = action.payload;
      },
      setStatus(state, action) {
         state.status = action.payload;
      },
   },
});

export const { setProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => {
   return async function fetchProductThunk (dispatch){
      dispatch(setStatus(STATUS.LOADING));
      try {
         const res = await fetch(`${BASE_URL}products`);
         const data = await res.json();
         dispatch(setProduct(data));
         dispatch(setStatus(STATUS.IDLE));
      } catch (error) {
         dispatch(setStatus(STATUS.ERROR));
      }
   };
};
