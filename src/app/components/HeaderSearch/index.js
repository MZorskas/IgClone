import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.scss';

// Components
import UserTag from '../../components/UserTag';

function HeaderSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  let body = {
    input: searchInput,
  };

  const getOptions = useCallback(async () => {
    setLoading(true);
    const response = await fetch('http://localhost:3001/v1/user/searchUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      setLoading(false);
      throw response;
    }
    const data = await response.json();
    console.log(data);
    setOptions(data);
    setLoading(false);
  }, [setOptions, body, searchInput]);

  useEffect(() => {
    setOptions([]);
    if (searchInput !== '') getOptions();
  }, [searchInput]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    console.log('handleClickOutside wrapperRef', wrapperRef);
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return (
    <div ref={wrapperRef} className="searchContainer">
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onClick={() => {
          setDisplay(!display);
        }}
        onKeyPress={() => {
          setDisplay(true);
        }}
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />
      {/* {loading && <p style={{ color: 'grey' }}>Loading...</p>} */}
      {display && searchInput !== '' && (
        <div className="autoCompleteContainer">
          {!loading && options.length === 0 ? (
            <p style={{ color: 'grey', marginTop: '18px' }}>
              No results found.
            </p>
          ) : (
            options.map((user, i) => {
              return (
                <UserTag
                  username={user.username}
                  fullName={user.fullName}
                  placeHolder={user.profilePicture}
                  key={user._id}
                  setDisplay={setDisplay}
                  setSearchInput={setSearchInput}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default HeaderSearch;
