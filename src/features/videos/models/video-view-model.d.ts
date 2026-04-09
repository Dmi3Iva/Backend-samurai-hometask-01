import { AVAILABLE_RESOLUTIONS_ENUM } from "@/constants/available-resolutions.const";

export interface VideoViewModel {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AVAILABLE_RESOLUTIONS_ENUM[];
}
