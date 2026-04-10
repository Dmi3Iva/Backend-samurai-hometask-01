import { AVAILABLE_RESOLUTIONS_ENUM } from "../../src/constants";
import {
  CreateVideoInputModel,
  UpdateViewInputModel,
} from "../../src/features/videos/models";

export const GetCreateVideoInputModel = ({
  title = "default title",
  author = "default author",
  availableResolutions = [AVAILABLE_RESOLUTIONS_ENUM.P144],
}): CreateVideoInputModel => {
  return {
    title,
    author,
    availableResolutions,
  };
};

export const GetUpdateVideoInputModel = ({
  title = "default updated title",
  author = "defaultUpdatedAuthor",
  availableResolutions = [AVAILABLE_RESOLUTIONS_ENUM.P240],
  canBeDownloaded = false,
  minAgeRestriction = 1,
  publicationDate = "2026-04-09T16:50:21.610Z",
}): Partial<UpdateViewInputModel> => {
  return {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
  };
};
