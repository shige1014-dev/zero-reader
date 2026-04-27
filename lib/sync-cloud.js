export function resolveSyncDate(preferredDate, availableDates) {
  if (availableDates.includes(preferredDate)) {
    return preferredDate;
  }

  const sorted = [...availableDates].sort((left, right) => right.localeCompare(left));
  return sorted[0] ?? null;
}
