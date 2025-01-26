import React, { forwardRef } from 'react';
import * as s from "../../../../styles/auth/search/search";

const SearchInput = forwardRef(({ placeholder, ...props }, ref) => {
    return (
        <s.SearchInputContainer
            placeholder={placeholder}
            ref={ref}
            {...props}
        />
    );
});

export default SearchInput;
