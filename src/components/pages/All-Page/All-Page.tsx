import GeneralList from "../../General-List/General-List";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import Search from "../../Search/Search";
import React from "react";

const AllPage: React.FC = () => {
    return (
        <>
            <Search listType="general" />
            <ErrorBoundary>
                <GeneralList />
            </ErrorBoundary>
        </>
    );
};

export default AllPage;
