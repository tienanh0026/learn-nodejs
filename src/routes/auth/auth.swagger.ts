/** POST Methods */
/**
 * @openapi
 * '/auth/login':
 *  post:
 *     tags:
 *     - Login
 *     summary: login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      200:
 *        description: Created
 *      422:
 *        description: Validation error
 *      500:
 *        description: Server Error
 */

/** GET Methods */
/**
 * @openapi
 * '/auth/current':
 *  get:
 *     tags:
 *     - Current User
 *     summary: Current User
 *     security:
 *     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Created
 *      422:
 *        description: Validation error
 *      500:
 *        description: Server Error
 */
