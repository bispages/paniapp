import { FunctionComponent } from 'react';
import { Image } from 'react-native-image-crop-picker';

export type Settings = {
  dark: boolean;
};

export type ItemList = {
  id: string;
  name: string;
  selected?: boolean;
};

export type User = {
  userPhone: string;
  userName?: string;
  pincode?: string;
  userType?: number;
  image?: Image | null;
  category?: ItemList[];
  userId?: string;
  place?: string;
};

export type MapView = {
  [key: string]: FunctionComponent;
};

export type DataListView = {
  id: string;
  component: FunctionComponent;
}[];

export type MaterialSizesType = {
  id: string;
  price: string;
  unit: string;
  count?: number;
  initialCount?: number;
};

export type MaterialType = {
  id: string;
  name: string;
  type: string;
  group: string;
  image: string;
  sizes: MaterialSizesType[];
};

export type MaterialItem = {
  id: string;
  name: string;
};

export type MaterialSpec = {
  id: string;
  name: string;
};

export type Materials = {
  material: MaterialSpec;
  count: number;
};

export type EstimateItem = {
  typeId: string;
  type: string;
  itemId: string;
  item: string;
  count: number;
  specId: string;
  spec: string;
};

export type Customer = {
  name?: string;
  area?: string;
  mobile?: string;
  pincode?: string;
};

export type FormValue = EstimateItem[];
export type EstimateFormValues = {
  customer: Customer;
  estimateItems: EstimateItem[];
};

export type MaterialsResponseObjectType = {
  [k: string]: MaterialType[];
};
