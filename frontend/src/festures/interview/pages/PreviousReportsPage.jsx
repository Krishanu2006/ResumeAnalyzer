import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllInterviewReports } from "../services/interview.api.js";
import "../style/PreviousReportsPage.scss";

const PreviousReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAllInterviewReports();

                console.log("REPORTS RESPONSE:", response);

                setReports(response?.interviewReports || []);
            } catch (error) {
                console.error("REPORTS ERROR:", error);
                setReports([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return (
            <main className="previous-reports">
                <div className="previous-reports__container">
                    <div className="previous-reports__loading">
                        Loading Previous Reports...
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="previous-reports">
            <div className="previous-reports__container">

                <header className="previous-reports__header">
                    <h1 className="previous-reports__title">
                        Previous Reports
                    </h1>

                    <p className="previous-reports__subtitle">
                        Review your previously generated resume analysis reports.
                    </p>
                </header>

                {reports.length === 0 ? (
                    <div className="previous-reports__empty">

                        <div className="previous-reports__empty-icon">
                            📄
                        </div>

                        <h2 className="previous-reports__empty-title">
                            No previous reports
                        </h2>

                        <p className="previous-reports__empty-text">
                            You haven't generated any saved reports yet.
                            Generate a resume analysis to see it here.
                        </p>

                    </div>
                ) : (
                    <div className="previous-reports__grid">

                        {reports.map((report) => (
                            <article
                                className="previous-reports__card"
                                key={report._id}
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <h2 className="previous-reports__card-title">
                                    {report.title}
                                </h2>

                                <div className="previous-reports__score">
                                    <span className="previous-reports__score-label">
                                        Match Score
                                    </span>

                                    <span className="previous-reports__score-value">
                                        {report.matchScore}%
                                    </span>
                                </div>

                                <div className="previous-reports__meta">
                                    <span className="previous-reports__date-label">
                                        Created
                                    </span>

                                    <span className="previous-reports__date">
                                        {new Date(report.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <span className="previous-reports__view">
                                    View Full Report →
                                </span>
                            </article>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
};

export default PreviousReportsPage;
