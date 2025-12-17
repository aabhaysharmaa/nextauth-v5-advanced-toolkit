

/**
 *  An Array of routes that accessible to teh public
 * these routes do not required authentications
 *@type {string[]}
 */

export const publicRoutes = [
	"/"
]


/**
 * An Array of routes that are accessible to the public
 *these routes will redirect logged in User to protected pages
 @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"]


/**
 * the prefix for Api authentication routes
 * Routes that start with this prefix are used for NextJs (API) authentication purposes
 */


export const apiAuthPrefix = "/api/auth"


/**
 * Default Api  Path for redirect after logged in
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings"