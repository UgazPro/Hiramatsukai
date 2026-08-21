import { IProfile } from "@/services/profile/profile.interface";
import { userRolesNames } from "@/services/students/student.interface";

interface RawProfileRole {
  id: number;
  rol: userRolesNames;
}

interface RawProfile extends Omit<IProfile, "roles"> {
  roles: RawProfileRole[];
}

export function transformProfile(raw: RawProfile): IProfile {
  return {
    ...raw,
    roles: raw.roles.map((r) => ({ id: r.id, rol: r.rol })),
  };
}
