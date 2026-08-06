import React,{useState, useEffect} from "react";
import {getAllInterviewReports} from "../services/interview.api.js"

const PreviousReportsPage = () => {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAllInterviewReports()
                setReports(response.data.interviewReports)
            } catch (error) {
                console.error("Error fetching interview reports:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchReports()

    },[])
    if (loading) {
        return <div>Loading Previous Reports...</div>
    }

     return (
        <main>
            <h1>Previous Reports</h1>

            {reports.length === 0 ? (
                <p>No previous reports found.</p>
            ) : (
                reports.map((report) => (
                    <div key={report._id}>
                        <h2>{report.title}</h2>
                        <p>Match Score: {report.matchScore}%</p>
                        <p>
                            Created: {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))
            )}
        </main>
    )
}

export default PreviousReportsPage