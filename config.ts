export const IS_DEV = process.env.DEV;

export const HOSTNAME = IS_DEV ? process.env.HOSTNAME_DEV : process.env.HOSTNAME_PROD;
