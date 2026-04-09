import { AVAILABLE_RESOLUTIONS_ENUM } from "@/constants";

export interface UpdateViewInputModel {
  /**
   * maxLength: 40
   */
  title: string;
  /**
   * maxLength: 20
   */
  author: string;
  /**
   * At least one resolution should be added
   */
  availableResolutions: AVAILABLE_RESOLUTIONS_ENUM[];
  /**
   * boolean
   */
  canBeDownloaded: boolean;
  /**
   * integer($int32)
   * maximum: 18
   * minimum: 1
   * null - no restriction
   */
  minAgeRestriction: number;
  /**
   * string($date-time) new Date().toISOString()
   */
  publicationDate: string;
}
