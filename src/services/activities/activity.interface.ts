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
  postulated: number;
  ActivityDojos: IDojo[] | IDojoEdit[]; 
}

export interface IDojoEdit {
  dojo: Dojo;
}

export interface Dojo {
  id:      number;
  dojo:    string;
  address: string;
}

export interface IAppliedStudent {
  id: number;
  userId: number;
  martialArtId: number;
  activityId: number;
  user: {
    id: number;
    name: string;
    lastName: string;
    profileImg?: string;
  };
  ranks: {
    id: number;
    belt: string;
    code: string;
    rank_name: string;
    martialArt: {
      id: number;
      martialArt: string;
    };
    martialArtId?: number;
  };
  currentRank: {
    id: number;
    belt: string;
    code: string;
    rank_name: string;
  };
  activity: {
    id: number;
    name: string;
    date: Date;
    description?: string;
  };
}

export interface IActivityCreate { 
  name: string;
  date: Date;
  place: string;
  price: number;
  latitude: number;
  longitude: number;
  dojoIds: number[];
  type: string;
  description: string;  
}

export interface IExam {
  id: number;
  status: "Aprobado" | "Reprobado" | "Pendiente";
  activity: {
    id: number;
    name: string;
    description: string;
    date: Date;
  };
  user: {
    id: number;
    name: string;
    lastName: string;
  };
  ranks: {
    id: number;
    belt: string;
    code: string;
    rank_name: string;
    martialArt: {
      id: number;
      martialArt: string;
    };
  };
  previousRank: {
    id: number;
    belt: string;
    code: string;
    rank_name: string;
    martialArt: {
      id: number;
      martialArt: string;
    };
  };
  createdAt: Date;
}









