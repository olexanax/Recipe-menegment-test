import SavedList from "../../Saved-List/Saved-List";
import Form from "../../Form/Form";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

const SavedPage = () => {
    return (
        <>
            <Form />
            <ErrorBoundary>
                <SavedList />
            </ErrorBoundary>
        </>
    );
};

export default SavedPage;
