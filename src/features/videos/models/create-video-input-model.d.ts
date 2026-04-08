export interface CreateVideoInputModel {
  /**
   *   maxLength: 40
   */
  title: string;
  /**
   *   maxLength: 20
   */
  author: string;
  /**
   * At least one resolution should be added
   */
  availableResolutions: AVAILABLE_RESOLUTIONS_ENUM[];
}
