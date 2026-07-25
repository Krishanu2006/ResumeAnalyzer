import { createContext, useState } from "react";

/**
 * Interview Context
 *
 * Stores all interview-related global state so it can be accessed
 * from any component without prop drilling.
 */
export const InterviewContext = createContext();

/**
 * Interview Provider
 *
 * Wrap your application with this provider to make interview data
 * available throughout the component tree.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 */
export const InterviewProvider = ({ children }) => {

    // Indicates whether an API request is currently in progress
    const [loading, setLoading] = useState(false);

    // Stores the currently selected/generated interview report
    const [report, setReport] = useState(null);

    // Stores all interview reports of the logged-in user
    const [reports, setReports] = useState([]);

    return (
        <InterviewContext.Provider
            value={{
                loading,
                setLoading,
                report,
                setReport,
                reports,
                setReports,
            }}
        >
            {children}
        </InterviewContext.Provider>
    );
};