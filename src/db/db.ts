export type VideoType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: srting;
};

export type DbType = {
  videos: VideoType[];
};

export const db: DbType = {
  videos: [],
};
