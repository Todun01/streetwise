export const ERROR_MESSAGES: Record<string, string> = {
    NOT_AUTHENTICATED: "Please sign in to continue.",
    FORBIDDEN: "You don't have permission to do that.",
    NOT_FOUND: "We couldn't find that.",
    NO_PROFILE: "Your profile isn't set up yet. Please sign out and in again.",
  
    // submissions
    IMAGE_REQUIRED: "Add at least one photo of the spot.",
    LOCATION_ACCURACY_TOO_LOW:
      "Your location isn't accurate enough yet. Step outside or wait a few seconds, then try again.",
    CAPTURE_TIME_INVALID: "That photo was taken too long ago. Take a fresh one at the spot.",
    UPLOAD_LIMIT_REACHED: "You've reached today's submission limit. Try again tomorrow.",
  
    // moderation
    ALREADY_REVIEWED: "This submission has already been reviewed.",
    CANNOT_REVIEW_OWN_UPLOAD: "You can't review your own submission.",
    REWARD_NOT_FOUND: "No reward found for this submission.",
  
    // trips
    OPEN_TRIP_EXISTS: "You have an unfinished trip. Resolve it before starting a new one.",
    COOLDOWN_ACTIVE: "You recently cancelled a trip. Please wait a little before starting another.",
    SPOT_UNAVAILABLE: "This spot isn't available right now.",
    TOO_FAR: "You're too far away. Get closer to unlock directions.",
    DAILY_LIMIT_REACHED: "You've reached today's trip limit.",
    INSUFFICIENT_CREDITS: "You don't have enough available credits.",
    PAYMENT_REQUIRED: "Choose a way to pay for this trip.",
    PAYMENT_NOT_VALID: "That payment can't be used for this trip.",
    TRIP_EXPIRED: "This trip's directions have expired.",
    ALREADY_RESOLVED: "This trip is already finished.",
    LOCATION_REQUIRED: "We need your location to do that.",
    NOT_AT_SPOT: "You don't seem to be at the spot yet. Move closer and try again.",
    UNKNOWN_ACTION: "Something went wrong. Please try again.",
  
    // payments / plans
    UNKNOWN_PLAN: "That plan doesn't exist.",
    PAYMENT_NOT_FOUND: "We couldn't find that payment.",
    SPOT_REQUIRED: "Choose a spot first.",
  
    // withdrawals
    KYC_REQUIRED: "Verify your identity before your first withdrawal.",
    PAYOUT_ACCOUNT_INVALID: "Choose a verified bank account.",
    WITHDRAWAL_IN_PROGRESS: "You already have a withdrawal in progress.",
    BELOW_MINIMUM: "You haven't reached the minimum balance for withdrawal yet.",
    INVALID_STATE: "That action isn't possible in the current state.",
    CANNOT_REVIEW_OWN_WITHDRAWAL: "You can't review your own withdrawal.",
    INVALID_STATUS: "Invalid status.",
  };
  
  export const FALLBACK_ERROR = "Something went wrong. Please try again.";
  
  function messageOf(err: unknown): string {
    const raw =
      typeof err === "string" ? err : (err as { message?: string } | null)?.message ?? "";
    return raw.trim();
  }
  
  /** Turn anything thrown by a backend call into a message safe to show a user. */
  export function friendlyError(err: unknown): string {
    return ERROR_MESSAGES[messageOf(err)] ?? FALLBACK_ERROR;
  }
  
  /** The raw code (e.g. "OPEN_TRIP_EXISTS"), so the UI can react to specific cases. */
  export function errorCode(err: unknown): string | null {
    const code = messageOf(err);
    return code in ERROR_MESSAGES ? code : null;
  }