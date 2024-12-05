const express = require('express')
const router = express.Router()
const { body } = require("express-validator")
const captionControllar = require("../Controllers/captionControllar")



router.post('/addCaption', [
    body('caption').notEmpty().withMessage('Caption is required'),
    body('userId').notEmpty().withMessage('User id is required'),
    body('postId').notEmpty().withMessage('Post id is required')
], captionControllar.createCaption)

module.exports = router;