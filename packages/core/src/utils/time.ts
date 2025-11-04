export const toIsoString = (date: Date | string | number) => {
  return new Date(date).toISOString();
};

export const nowIso = () => new Date().toISOString();
