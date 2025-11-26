// Utility functions to filter data by organization

interface WithOrganizationId {
  organization_id?: string
}

interface WithBuildingId {
  building_id?: string
}

// Filter array by organization ID
export function filterByOrganization<T extends WithOrganizationId>(items: T[], organizationId: string): T[] {
  return items.filter((item) => item.organization_id === organizationId)
}

// Filter buildings by organization
export function filterBuildingsByOrganization(
  buildings: Array<{ id: string; organization_id?: string }>,
  organizationId: string,
) {
  return buildings.filter((building) => building.organization_id === organizationId)
}

// Filter units by buildings (organization scoped)
export function filterUnitsByBuildings<T extends WithBuildingId>(units: T[], buildings: Array<{ id: string }>): T[] {
  const buildingIds = new Set(buildings.map((b) => b.id))
  return units.filter((unit) => unit.building_id && buildingIds.has(unit.building_id))
}

// Check if user belongs to organization
export function validateUserOrganization(userOrgId: string, requiredOrgId: string): boolean {
  return userOrgId === requiredOrgId
}
