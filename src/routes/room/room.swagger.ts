/** GET Methods */
/**
 * @openapi
 * '/room/{roomId}':
 *   get:
 *     tags:
 *       - Room Detail
 *     summary: Get room detail
 *     parameters:
 *       - in: path
 *         name: roomId
 *         description: RoomId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Created
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server Error
 */

/** GET Methods */
/**
 * @openapi
 * '/room/list':
 *   get:
 *     tags:
 *       - Get room list
 *     summary: Room list
 *     responses:
 *       200:
 *         description: Created
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server Error
 */

/** POST Methods */
/**
 * @openapi
 * '/room/{roomId}/edit':
 *   post:
 *     tags:
 *       - Edit room
 *     summary: Edit room
 *     parameters:
 *       - in: path
 *         name: roomId
 *         description: RoomId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "Image file (jpg, png, gif)"
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [1, 2]
 *     responses:
 *       200:
 *         description: Created
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server Error
 */
