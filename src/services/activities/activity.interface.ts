

export interface IActivity {
  id: number;
  name: string;
  date: Date;
  place: string;
  price: number;
  latitude: number;
  longitude: number;
  dojosId?: number;
  dojoIds?: number[];
  createdDate: Date;
  dojos: {};
  type: string;
  description: string;
  ActivityDojos: [];
}












