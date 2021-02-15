// ! Do not remove the env comments they are used for building the correct environemnt
// env
export * from 'environments/fake/fake'
// env

// Core Constants
export const VERSION = process.env.VERSION && process.env.VERSION.replace(/"/g, '')
export const AUTH_TOKEN_SLUG = `JWT`
export const APP_ENV = process.env.APP_ENV

// Field Constants

// Other Contants
