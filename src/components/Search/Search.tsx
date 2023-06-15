import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "antd";
import {
    setAllPageSearchTerm,
    setSavePageSearchTerm,
} from "../../slices/filtersSlice";
import { SearchProps } from "../../interfaces";

const Search: React.FC<SearchProps> = ({ listType }) => {
    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch();
    const debouncedValue = useDebounce<string>(value, 300);

    useEffect(() => {
        switch (listType) {
            case "general":
                dispatch(setAllPageSearchTerm(debouncedValue));
                break;
            case "saved":
                dispatch(setSavePageSearchTerm(debouncedValue.toLowerCase()));
                break;

            default:
                return;
        }
    }, [debouncedValue]);

    return (
        <Input
            className="mt-2 mb-2 w-96
            "
            placeholder="Search"
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default Search;
