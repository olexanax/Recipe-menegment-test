import GeneralList from "../../General-List/General-List";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

import React from "react";

const AllPage: React.FC = () => {
    return (
        <ErrorBoundary>
            <GeneralList />
        </ErrorBoundary>
    );
};

export default AllPage;
