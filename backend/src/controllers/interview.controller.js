const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')


/**
 * @description Controller to generate interview report based on the user self description, resume and job description.
 */
async function generateInterviewReportController(req,res) {
    const resumeFile = req.file
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {selfDescription,jobDescription} = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume : resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}

/**
 * @description Controller to get interview report by interviewID
 */
async function getReportByIDController(req,res) {
    const {interviewID} = req.params

    const interviewReport = await interviewReportModel.findOne({_id:interviewID, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview Report Not Found"
        })
    }

    return res.status(200).json({
        message : "Interview report fetched successfully",
        interviewReport
    })
}

/**
 * @description controller to get all interview report of the logged in user
 */
async function getAllInterviewReportController(req,res) {
    const interviewReports = (await interviewReportModel.find({user: req.user.id})).toSorted({createdAt:-1})
}

module.exports = {generateInterviewReportController,getReportByIDController,getAllInterviewReportController}