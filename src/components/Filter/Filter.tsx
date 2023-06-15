import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "antd";
import { Button, Radio } from "antd";
import {
    setAllPageFilterTerm,
    setSavePageFilterTerm,
} from "../../slices/filtersSlice";
import { FilterProps, FilterTypes } from "../../interfaces";

const Filter: React.FC<FilterProps> = ({ listType }) => {
    const [value, setValue] = useState<FilterTypes>("all");
    const dispatch = useDispatch();
    useEffect(() => {
        switch (listType) {
            case "general":
                dispatch(setAllPageFilterTerm(value));
                break;
            case "saved":
                dispatch(setSavePageFilterTerm(value));
                break;

            default:
                return;
        }
    }, [value]);
    return (
        <Radio.Group
            className="m-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="own">Own</Radio.Button>
            <Radio.Button value="favorite">Favorite</Radio.Button>
        </Radio.Group>
    );
};

export default Filter;
