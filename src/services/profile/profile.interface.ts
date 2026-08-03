export interface IProfile {
  name: string;
  lastName: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  sex: string;
  identification: string;
  enrollmentDate: string;
  birthday: string;
  roles: IProfileRole[];
  dojo: {
    dojo: string;
    id: number;
    code: string;
  };
  userRanks: IProfileRank[];
}

export interface IProfileRole {
  id: number;
  rol: string;
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
