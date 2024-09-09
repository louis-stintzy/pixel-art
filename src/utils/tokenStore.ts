const tokenStore = new Map<
  string,
  {
    lastRanRef: number | undefined;
    timeoutRef: ReturnType<typeof setTimeout> | null;
  }
>();

export const addToken = (token: string) => {
  if (!tokenStore.has(token)) {
    tokenStore.set(token, {
      lastRanRef: undefined,
      timeoutRef: null,
    });
  }
};

export const getTokenData = (token: string) => {
  return tokenStore.get(token);
};

export const clearTokenData = (token: string) => {
  if (tokenStore.has(token)) {
    const timeout = getTokenData(token)?.timeoutRef;
    if (timeout) clearTimeout(timeout);
    tokenStore.delete(token);
  }
};

export const updateTokenData = (
  token: string,
  data: {
    lastRanRef: number | undefined;
    timeoutRef: ReturnType<typeof setTimeout> | null;
  }
) => {
  // console.log(Date.now(), '-----TokenStore before update:', tokenStore);
  // console.log('Updating token data:', token, data);
  clearTokenData(token);
  tokenStore.set(token, data);
  // console.log(Date.now(), '-----TokenStore after update:', tokenStore);
};

export const getTokenStore = () => tokenStore;
