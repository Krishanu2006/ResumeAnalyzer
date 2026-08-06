import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById,
    generateResumePdf
} from "../services/interview.api";

import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

/**
 * Custom Hook: useInterview
 *
 * Provides interview-related state and helper functions
 * such as generating reports, fetching reports, and
 * downloading resume PDFs.
 */
export const useInterview = () => {

    // Access global interview state
    const context = useContext(InterviewContext);

    // Get interview ID from URL parameters (if present)
    const { interviewId } = useParams();

    // Ensure the hook is used inside InterviewProvider
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

    /**
     * Generate a new interview report.
     *
     * Uploads the resume and user details to the backend,
     * then stores the generated report in global state.
     */
    // const generateReport = async ({
    //     jobDescription,
    //     selfDescription,
    //     resumeFile
    // }) => {

    //     setLoading(true);

    //     let response = null;

    //     try {
    //         response = await generateInterviewReport({
    //             jobDescription,
    //             selfDescription,
    //             resumeFile
    //         });

    //         // Save generated report
    //         setReport(response.interviewReport);

    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }

    //     return response.interviewReport;
    // };

    const generateReport = async ({
        jobDescription,
        selfDescription,
        resumeFile
    }) => {

        setLoading(true);

        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

            setReport(response.interviewReport);

            return response.interviewReport;

        } catch (error) {
            console.error(error);

            return null;   // <-- IMPORTANT
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch a single interview report by its ID.
     */
    const getReportById = async (interviewId) => {

        setLoading(true);

        let response = null;

        try {
            response = await getInterviewReportById(interviewId);

            // Store selected report
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false);
        }

        return response.interviewReport;
    };

    /**
     * Fetch all interview reports for the current user.
     */
    const getReports = async () => {

        setLoading(true);

        let response = null;

        try {
            response = await getAllInterviewReports();

            // Update reports list
            setReports(response.interviewReports);
            return response.interviewReports;

        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false);
        }

        return response.interviewReports;
    };

    /**
     * Download the interview report as a PDF.
     */
    const getResumePdf = async (interviewReportId) => {

        setLoading(true);

        let response = null;

        try {
            response = await generateResumePdf({
                interviewReportId
            });

            // Create a downloadable PDF URL
            const url = window.URL.createObjectURL(
                new Blob([response], {
                    type: "application/pdf"
                })
            );

            // Create a temporary download link
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute(
                "download",
                `resume_${interviewReportId}.pdf`
            );

            document.body.appendChild(link);
            link.click();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Automatically fetch data whenever the route changes.
     *
     * - If interviewId exists → fetch that report.
     * - Otherwise → fetch all reports.
     */
    useEffect(() => {

        if (interviewId) {
            getReportById(interviewId);
        }

    }, [interviewId]);

    // Expose state and helper functions
    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    };
};