const express = require('express')
const authMiddlewware = require('../middleware/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middleware/file.middleware')

const interviewRouter = express.Router()

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user's self description, resume PDF and job description
 * @access private
 */
interviewRouter.post('/',authMiddlewware.authUser,upload.single("resume"),interviewController.generateInterviewReportController) //the request will be forwarded if and only if a logged in user came

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interview id
 * @access private
 */
interviewRouter.get('/report/:interviewId',authMiddlewware.authUser,interviewController.getReportByIDController)

/**
 * @route GET /api/interview
 * @description get all interview report of logged in user
 * @access private
 */
interviewRouter.get('/',authMiddlewware.authUser,interviewController.getAllInterviewReportController)

module.exports = interviewRouter