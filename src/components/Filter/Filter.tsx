import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Radio } from "antd";
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
        //eslint-disable-next-line
    }, [value]);

    return (
        <Radio.Group
            className="m-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            <Radio.Button value="All">All</Radio.Button>
            <Radio.Button value="Own">Own</Radio.Button>
            <Radio.Button value="Favorite">Favorite</Radio.Button>
        </Radio.Group>
    );
};

export default Filter;
