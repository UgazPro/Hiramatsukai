import { useMemo } from "react";
import { IDojo } from "@/services/dojos/dojo.interface";
import { useUserData } from "@/helpers/token";

export const getDojoDescendants = (rootId: number, dojos: IDojo[]): number[] => {
  const childrenByParent = new Map<number, number[]>();

  dojos.forEach((d) => {
    if (d.parentDojoId == null) return;
    const list = childrenByParent.get(d.parentDojoId) ?? [];
    list.push(d.id);
    childrenByParent.set(d.parentDojoId, list);
  });

  const result: number[] = [];
  const stack = [rootId];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const children = childrenByParent.get(current) ?? [];
    children.forEach((child) => {
      result.push(child);
      stack.push(child);
    });
  }

  return result;
};

export function useVisibleDojos(dojos: IDojo[]) {
  const user = useUserData();

  const isAdmin = user?.roles?.some(({ rol }) => rol === "Administrador");
  const userDojoId = user?.dojo?.id;

  return useMemo(() => {
    if (isAdmin) return dojos;
    if (userDojoId == null) return [];
    const ids = new Set([userDojoId, ...getDojoDescendants(userDojoId, dojos)]);
    return dojos.filter((d) => ids.has(d.id));
  }, [dojos, isAdmin, userDojoId]);
}

export function useFilteredDojos(dojos: IDojo[], searchTerm: string) {
  const visibleDojos = useVisibleDojos(dojos);

  const { dojoById, getParentName } = useMemo(() => {
    const dojoById = new Map<number, IDojo>();
    visibleDojos.forEach((d) => dojoById.set(d.id, d));
    const getParentName = (d: IDojo) => dojoById.get(d.parentDojoId ?? -1)?.dojo ?? "";
    return { dojoById, getParentName };
  }, [visibleDojos]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return visibleDojos;
    return visibleDojos.filter((d) =>
      [d.dojo, d.code, d.address, d.addressShort].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }, [visibleDojos, searchTerm]);

  return { visibleDojos, filtered, dojoById, getParentName };
}
