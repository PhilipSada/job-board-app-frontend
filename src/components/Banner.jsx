import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({
  handleJobTitleInputChange,
  handleJobLocationInputChange,
  jobTitleQuery,
  jobLocationQuery,
  handleFilter
}) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-20 py-14 px-4">
      <h1 className="text-5xl font-bold text-primary mb-3">
        Find your <span className="text-blue">new tech job</span> today
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Discover lucrative opportunities and ignite promising careers with our
        cutting-edge Tech Job Board.
      </p>

      <form className="">
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <div className="flex md:rounded-s-md rounded ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500 md:w-1/2 w-full">
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="What position are you looking for ?"
              onChange={handleJobTitleInputChange}
              value={jobTitleQuery}
            />
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>

          <div className="flex md:rounded-none rounded ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-2 focus-within:ring-gray-500 md:w-1/3">
            <input
              type="text"
              name="location"
              id="location"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Location"
              onChange={handleJobLocationInputChange}
              value={jobLocationQuery}
            />
            <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>

          <button
            type="submit"
            className="bg-blue py-2 px-8 text-white md:rounded-e-md md:rounded-s-none rounded"
            onClick={handleFilter}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
