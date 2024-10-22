import { UnitsByCategory } from '../constants';

export function getUnitCategory(unit: string): string | undefined {
  for (const [category, units] of Object.entries(UnitsByCategory)) {
    if ((units as string[]).includes(unit)) {
      return category;
    }
  }
  return undefined;
}
