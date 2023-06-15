import SavedList from "../../Saved-List/Saved-List";
import Form from "../../Form/Form";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import Filter from "../../Filter/Filter";
import Search from "../../Search/Search";

const SavedPage = () => {
    return (
        <>
            <Search listType="saved" />
            <Filter listType="saved" />
            <Form />
            <ErrorBoundary>
                <SavedList />
            </ErrorBoundary>
        </>
    );
};

export default SavedPage;
