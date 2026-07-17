const mongoose = require('mongoose');

/**
 * job description schema - String
 * resume text - String
 * self description - String
 * 
 * 
 * matchScore : number
 * technical questions - array - [{
 *  question : "",
 *  intention : "",
 *  answer : ""
 * }]
 * behavioral question - array - [{
 *  question: "",
 *  intention : "",
 *  answer : ""
 * }]
 * skill gaps - array - [{
 *  skills : "",
 *  severity : {
 *      type : String,
 *      enum : ['low', 'medium', 'high']
 *  }
 * }]
 * preparation plan - multiple days - array of objects - [{
 *  day : number,
 *  focus : string,
 *  tasks : array of string
 * }]
 */
const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Technical question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required"]
    },
    answer : {
        type : String,
        required : [true,"Answer is required"]
    }
},{
    _id : false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Technical question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required"]
    },
    answer : {
        type : String,
        required : [true,"Answer is required"]
    }
},{
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skills are required"]
    },
    severity : {
        type : String,
        enum : ["low","medium","high"],
        required : [true, "Severity is required"]
    }
},{
    _id : false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [ true, "Day is required" ]
    },
    focus: {
        type: String,
        required: [ true, "Focus is required" ]
    },
    tasks: [ {
        type: String,
        required: [ true, "Task is required" ]
    } ]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : [true, "Job description is required"]
    },
    resumeText : {
        type : String,
    },
    selfDescription : {
        type : String
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillGapSchema],
    preparationPlan : [preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

},{
    timestamps : true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

module.exports = interviewReportModel;