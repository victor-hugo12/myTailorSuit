// src/utils/suitUtils.ts
export const mapMeasurementsToNumber = (
  measurements: Record<string, string | number>
) =>
  Object.fromEntries(
    Object.entries(measurements).map(([k, v]) => [k, Number(v)])
  );
