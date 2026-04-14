export const ONLINE_REQUIRED_MESSAGE = 'This action requires an internet connection.';

export const isBrowserOnline = () => {
  if (typeof navigator === 'undefined') {
    return true;
  }

  return navigator.onLine;
};

export const assertOnline = (message = ONLINE_REQUIRED_MESSAGE) => {
  if (!isBrowserOnline()) {
    throw new Error(message);
  }
};

export const canUseLocalStorage = () => (
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
);
