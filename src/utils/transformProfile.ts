import { IProfile } from "@/services/profile/profile.interface";

interface RawProfileRole {
  rol: {
    id: number;
    rol: string;
  };
}

interface RawProfile extends Omit<IProfile, "roles"> {
  roles: RawProfileRole[];
}

export function transformProfile(raw: RawProfile): IProfile {
  return {
    ...raw,
    roles: raw.roles.map((r) => r.rol),
  };
}
