export class Constants {
  public static ZERO_VALUE = 0;
  public static MAXIMUM_INACTIVE_TIME = 1000 * 60 * 20; // 20 minutes.
  public static SERVICE_CALL_TIMEOUTS = 1000 * 60; // 60 seconds.
  public static ERROR_LOG_LINE_LIMIT = 40;
  public static TOAST_MESSAGE_DURATION = 1000 * 4; // 4 seconds
  public static LOG_DUMP_INTERVAL = 1000 * 30; // 30 seconds.
  public static STORAGE_PREFIX = 'NarBOrd_';
  public static DASHBOARD_PATH = 'dashboard';
  public static ORDER_PATH = 'order';
  public static ERROR_PATH = 'error';
  public static ENGLISH_LANGUAGE = 'en';
  public static SPANISH_LANGUAGE = 'es';
  public static COLUMN_NAME = 'name';
  public static COLUMN_PRICE = 'maxBidPrice';
  public static COLUMN_TYPE = 'dataPackageType';
  public static COLUMN_OPTIONS = 'options';
  public static PRICE_REGEX = '^\\$?\\d+(,\\d{3})*(\\.\\d{2})?$';
  public static REQUIRED_ERROR = 'required';
  public static PATTERN_ERROR = 'pattern';

}
