const extractImageUrls = (description: string | undefined): string[] => {
  if (!description) {
    return [];
  }
  const regex = /<img[^>]+src="([^">]+)"/g;

  const matches = [...description.matchAll(regex)];

  return matches.map((match) => match[1]);
};

export default extractImageUrls;
