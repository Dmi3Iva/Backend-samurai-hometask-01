import { IErrorMessage } from "./error-messages";
import { AVAILABLE_RESOLUTIONS_ENUM } from "../../../constants";

const isIsoDate = (str: string): boolean => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return !isNaN(d.getTime()) && d.toISOString() === str; // valid date
};

// id*	integer($int32)
// title*	string
// author*	string
// canBeDownloaded*	boolean

// By default - false
// minAgeRestriction*	integer($int32)
// maximum: 18
// minimum: 1
// default: null

// null - no restriction
// createdAt*	string($date-time)
// publicationDate*	string($date-time)

// By default - +1 day from CreatedAt
// availableResolutions*	[h01.ResolutionsstringEnum:
// [ P144, P240, P360, P480, P720, P1080, P1440, P2160 ]]
export const validateCreateVideoInputModelPractice = (
  m: unknown,
): IErrorMessage[] => {
  const errors: IErrorMessage[] = [];

  if (typeof m !== "object" || m === null) {
    errors.push({
      field: "",
      message: "Not object send",
    });

    return errors;
  }

  if (!("title" in m)) {
    errors.push({
      field: "title",
      message: "title is required field",
    });
  }
  if ("title" in m && typeof m["title"] !== "string") {
    errors.push({
      field: "title",
      message: '"title" should be a string',
    });
  }
  if (
    "title" in m &&
    typeof m["title"] === "string" &&
    m["title"].length > 40
  ) {
    errors.push({
      field: "title",
      message: '"title" field max length is 40',
    });
  }

  if (!("author" in m)) {
    errors.push({
      field: "author",
      message: "author is required field",
    });
  }
  if ("author" in m && typeof m["author"] !== "string") {
    errors.push({
      field: "author",
      message: '"author" should be a string',
    });
  }
  if (
    "author" in m &&
    typeof m["author"] === "string" &&
    m["author"].length > 20
  ) {
    errors.push({
      field: "author",
      message: '"author" field max length is 20',
    });
  }

  return errors;
};

export const validateCreateVideoInputModel = (m: unknown): IErrorMessage[] => {
  const errors: IErrorMessage[] = [];

  if (typeof m !== "object" || m === null) {
    errors.push({
      field: "",
      message: "Not object send",
    });

    return errors;
  }

  if (!("title" in m)) {
    errors.push({
      field: "title",
      message: "title is required field",
    });
  }
  if ("title" in m && typeof m["title"] !== "string") {
    errors.push({
      field: "title",
      message: '"title" should be a string',
    });
  }
  if (
    "title" in m &&
    typeof m["title"] === "string" &&
    m["title"].length > 40
  ) {
    errors.push({
      field: "title",
      message: '"title" field max length is 40',
    });
  }

  if (!("author" in m)) {
    errors.push({
      field: "author",
      message: "author is required field",
    });
  }
  if ("author" in m && typeof m["author"] !== "string") {
    errors.push({
      field: "author",
      message: '"author" should be a string',
    });
  }
  if (
    "author" in m &&
    typeof m["author"] === "string" &&
    m["author"].length > 20
  ) {
    errors.push({
      field: "author",
      message: '"author" field max length is 20',
    });
  }

  const field = "availableResolutions";
  if (!(field in m)) {
    errors.push({
      field,
      message: `field ${field} is required`,
    });
  } else {
    const value = m[field];
    if (!Array.isArray(value)) {
      errors.push({
        field,
        message: `field ${field} should be array`,
      });
    } else {
      if (value.length < 1) {
        errors.push({
          field,
          message: `field ${field} should has at least one value`,
        });
      } else {
        const possibleKeys = Object.values(AVAILABLE_RESOLUTIONS_ENUM);
        if (value.some((v) => !possibleKeys.includes(v))) {
          errors.push({
            field,
            message: `field ${field} should contain only possible values from available resolutions enum ${possibleKeys.join(",")}`,
          });
        }
      }
    }
  }

  return errors;
};

export const validateUpdateVideoInputModel = (m: unknown): IErrorMessage[] => {
  const errors: IErrorMessage[] = [];

  if (typeof m !== "object" || m === null) {
    errors.push({
      field: "",
      message: "Not object send",
    });

    return errors;
  }

  if (!("title" in m)) {
    errors.push({
      field: "title",
      message: "title is required field",
    });
  }
  if ("title" in m && typeof m["title"] !== "string") {
    errors.push({
      field: "title",
      message: '"title" should be a string',
    });
  }
  if (
    "title" in m &&
    typeof m["title"] === "string" &&
    m["title"].length > 40
  ) {
    errors.push({
      field: "title",
      message: '"title" field max length is 40',
    });
  }

  if (!("author" in m)) {
    errors.push({
      field: "author",
      message: "author is required field",
    });
  }
  if ("author" in m && typeof m["author"] !== "string") {
    errors.push({
      field: "author",
      message: '"author" should be a string',
    });
  }
  if (
    "author" in m &&
    typeof m["author"] === "string" &&
    m["author"].length > 20
  ) {
    errors.push({
      field: "author",
      message: '"author" field max length is 20',
    });
  }

  const field = "availableResolutions";
  if (!(field in m)) {
    errors.push({
      field,
      message: `field ${field} is required`,
    });
  } else {
    const value = m[field];
    if (!Array.isArray(value)) {
      errors.push({
        field,
        message: `field ${field} should be array`,
      });
    } else {
      if (value.length < 1) {
        errors.push({
          field,
          message: `field ${field} should has at least one value`,
        });
      } else {
        const possibleKeys = Object.values(AVAILABLE_RESOLUTIONS_ENUM);
        if (value.some((v) => !possibleKeys.includes(v))) {
          errors.push({
            field,
            message: `field ${field} should contain only possible values from available resolutions enum ${possibleKeys.join(",")}`,
          });
        }
      }
    }
  }

  if (!("canBeDownloaded" in m)) {
    errors.push({
      field: "canBeDownloaded",
      message: `field ${"canBeDownloaded"} is required`,
    });
  } else {
    if (typeof m["canBeDownloaded"] !== "boolean") {
      errors.push({
        field: '"canBeDownloaded"',
        message: `field ${"canBeDownloaded"} should be a boolean`,
      });
    }
  }

  if (!("minAgeRestriction" in m)) {
    errors.push({
      field: "minAgeRestriction",
      message: `field ${"minAgeRestriction"} is required`,
    });
  } else {
    const value = m["minAgeRestriction"];
    if (typeof value !== null && typeof value !== "number") {
      errors.push({
        field: "minAgeRestriction",
        message:
          "field minAgeRestriction should has type null or number value between 1 and 18",
      });
    } else {
      if (typeof value === "number" && (value < 1 || value > 18)) {
        errors.push({
          field: "minAgeRestriction",
          message: "field minAgeRestriction value should be between 1 and 18",
        });
      }
    }
  }

  const publicationDateField = "publicationDate";
  if (!(publicationDateField in m)) {
    errors.push({
      field: publicationDateField,
      message: `field ${publicationDateField} is required`,
    });
  } else {
    if (typeof m[publicationDateField] !== "string") {
      errors.push({
        field: publicationDateField,
        message: `field ${publicationDateField} should has string type`,
      });
    } else if (!isIsoDate(m[publicationDateField])) {
      errors.push({
        field: publicationDateField,
        message: `field ${publicationDateField} should be in iso format`,
      });
    }
  }

  return errors;
};
