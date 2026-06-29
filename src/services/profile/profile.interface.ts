export interface IProfile {
  identification: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  enrollmentDate: string;
  birthday: string;
  sex: string;
  rolId?: number;
  rol: {
    id: number;
    rol: string;
  };
  dojo: {
    dojo: string;
    id: number;
  };
  userRanks: IProfileRank[];
}

export interface IProfileRank {
  martialArt: {
    id: number;
    martialArt: string;
    icon: string;
  };
  rank: {
    id: number;
    rank_name: string;
    belt: string;
    icon: string;
    code: string;
  };
}
