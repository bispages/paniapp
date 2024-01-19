import { IdentityApiSlice } from '../slices/IdentityApiSlice';

// Any api selectors can be written here.
export const selectMaterials = IdentityApiSlice.endpoints.getMaterials.select();
