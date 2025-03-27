export const COMMON_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  BAD_REQUEST: "Invalid request",
  SUCCESS: "Operation successful",
};

export const AUTH_MESSAGES = {
  PASSWORD_MISMATCH: "Passwords don't match",
  USERNAME_TAKEN: "Username already exists",
  INVALID_CREDENTIALS: "Invalid credentials",
  USER_NOT_FOUND: "User not found",
  LOGOUT_SUCCESS: "Logged out successfully",
  NO_TOKEN_PROVIDED: "No token provided",
  INVALID_TOKEN: "Invalid Token",
};

export const SUBTITLE_MESSAGES = {
  NOT_FOUND: "Subtitle document not found.",
  FORBIDDEN: "You do not have permission to modify or delete this subtitle document.",
  UPLOAD_REQUIRED: "An SRT file must be uploaded.",
  ALREADY_EXISTS: "A subtitle with this name already exists.",
  CREATED: "Subtitle document created successfully.",
  UPDATED: "Subtitle document updated successfully.",
  DELETED: "Subtitle document deleted successfully.",
};

export const ACCESS_MESSAGES = {
  NO_PERMISSION: "Only the document owner can manage access.",
  ALREADY_HAS_ACCESS: "User already has access.",
  ADDED_AS_VIEWER: "User added as a viewer.",
  ADDED_AS_EDITOR: "User added as an editor.",
  ALREADY_EDITOR: "User is already an editor.",
  UPGRADED_TO_EDITOR: "User upgraded from viewer to editor.",
};