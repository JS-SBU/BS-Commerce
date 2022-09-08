import React from 'react';

interface Properties {
  placeholder: string;
}

const Search: React.FC<Properties> = (props) => {
  return (
    <div
      className={`flex h-12 w-full flex-row items-center justify-between rounded-full border border-slate-200 text-sm`}
    >
      <input
        className="ml-4 bg-white focus:outline-none"
        type="search"
        name="search"
        placeholder={`${props.placeholder}`}
      />
      <div className="flex h-12 w-14 cursor-pointer justify-center rounded-r-full bg-green-600 transition-all duration-200 ease-linear hover:bg-stone-900">
        <button type="submit" className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
