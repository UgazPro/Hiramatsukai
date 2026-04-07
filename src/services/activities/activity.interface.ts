import { IDojo } from "../dojos/dojo.interface";

export interface IActivity {
  id: number;
  name: string;
  date: Date;
  place: string;
  price: number;
  latitude: number;
  longitude: number;
  dojoIds: number[];
  createdDate: Date;
  type: string;
  description: string;
  ActivityDojos: IDojo[];
}












