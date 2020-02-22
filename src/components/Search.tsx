import React, { useState, useEffect, ChangeEvent } from 'react';

import SearchInput from '../containers/SearchInput';
import { searchForUser } from '../actions/apiCalls';

const Search: React.FC = (): JSX.Element => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchTimeout, setSearchTimeout] = useState();
    const minValueLength = 3;

    const handeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchInput(e.target.value);
        clearTimeout(searchTimeout);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await searchForUser(searchInput);
            console.log(data);
        };

        if (searchInput.length < minValueLength) {
            return;
        } else {
            setSearchTimeout(
                setTimeout(() => {
                    fetchData();
                }, 1000)
            );
        }

        return () => {
            clearTimeout(searchTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    return <SearchInput value={searchInput} onChange={handeSearch} />;
};

export default Search;
