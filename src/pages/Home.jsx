import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import { getData } from "../services/api/axios";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getData("/all-jobs", false);
      setJobs(data);
      setFilteredJobs(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data without auth:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setJobTitleQuery("");
    setJobLocationQuery("");
    fetchData();
  }, []);

  const [jobTitleQuery, setJobTitleQuery] = useState("");
  const [jobLocationQuery, setJobLocationQuery] = useState("");

  const handleJobTitleInputChange = (event) => {
    setJobTitleQuery(event.target.value);
  };
  const handleJobLocationInputChange = (event) => {
    setJobLocationQuery(event.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    // Filter data based on jobTitle and jobLocation queries
    const filtered = jobs.filter((job) => {
      const titleMatch = job.jobTitle
        .toLowerCase()
        .includes(jobTitleQuery.toLowerCase());
      const locationMatch = job.jobLocation
        .toLowerCase()
        .includes(jobLocationQuery.toLowerCase());
      const skillMatch = selectedSkill
        ? job.skills.includes(selectedSkill)
        : true;
      const employmentTypeMatch = selectedEmploymentType
        ? job.employmentType === selectedEmploymentType
        : true;
      const salaryRangeMatch = selectedSalaryRange
        ? job.salaryRange === selectedSalaryRange
        : true;

      return (
        titleMatch &&
        locationMatch &&
        skillMatch &&
        employmentTypeMatch &&
        salaryRangeMatch
      );
    });

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div>
      <Banner
        handleJobTitleInputChange={handleJobTitleInputChange}
        handleJobLocationInputChange={handleJobLocationInputChange}
        jobTitleQuery={jobTitleQuery}
        jobLocationQuery={jobLocationQuery}
        handleFilter={handleFilter}
      />
      {/* main content */}
      <div className="bg-[#F9F9F9] min-h-screen">
        <div className="max-w-screen-2xl container mx-auto">
          <div className="lg:px-24 px-4 py-12">
            <div className="bg-white p-4 rounded min-h-[300px]">
              {isLoading ? ( // Loading indicator
                <div className="h-[250px] flex items-center justify-center flex-col">
                  <p className="font-medium text-center text-lg">Loading...</p>
                  <p className="font-medium text-center text-sm mt-2">This application uses vercel for hosting the express.js apis</p>
                </div>
              ) : filteredJobs.length > 0 ? (
                <>
                  <div>
                    <h3 className="text-lg font-bold mb-2">
                      {jobs.length} Jobs
                    </h3>
                  </div>
                  <section className="card-container">
                    {currentItems.map((job, index) => (
                      <Card key={index} data={job} />
                    ))}
                  </section>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold mb-2">
                    {/* {result.length} Jobs */}
                    {jobs.length} Jobs
                  </h3>
                  <div className="flex justify-center items-center h-[300px]">
                      <p className="font-semibold text-md">No Jobs found</p>
                  </div>
                
                </>
              )}

              {filteredJobs.length > 0 ? (
                <div className="flex justify-center mt-4 space-x-8">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="hover:underline"
                  >
                    Previous
                  </button>
                  <span className="mx-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="hover:underline"
                  >
                    Next
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
