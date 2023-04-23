import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';


import { EstimateFormValues, EstimateItem, Customer } from '../../types';

const initialState: EstimateFormValues = {
  customer: {},
  estimateItems: [],
};

const estimateStateSlice = createSlice({
  name: 'estimateState',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    },
    addEstimate: (state, action: PayloadAction<EstimateItem[]>) => {
      state.estimateItems = action.payload;
    },
    resetEstimate: (state, action: PayloadAction<void>) => {
      state.estimateItems = [];
    },
  },
});

export const { addCustomer, addEstimate, resetEstimate } = estimateStateSlice.actions;

export const selectEstimateState = (state: RootState) => state.estimateState;

export const estimateStateReducer = estimateStateSlice.reducer;
