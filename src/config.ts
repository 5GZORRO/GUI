// ! Do not remove the env comments they are used for building the correct environemnt
// env
export * from 'environments/staging'
// env

// Core Constants
export const VERSION = process.env.VERSION && process.env.VERSION.replace(/"/g, '')
export const AUTH_TOKEN_SLUG = 'JWT'
export const APP_ENV = process.env.APP_ENV
export const BUILD_DATE = process.env.BUILD_DATE
export const SESSION_TOKEN = 'stakeholderDID'
export const SESSION_USER = 'stakeholder'
export const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZZ'
// Field Constants

// Other Contants
