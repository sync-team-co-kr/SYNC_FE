export const searchFilter = (search: string, options: any[] | undefined) => {
  if (search.length === 0) {
    return options;
  }

  return options?.filter((option) =>
    option.title.toLowerCase().includes(search.toLowerCase()),
  );
};
