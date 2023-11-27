import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useLoaderData,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import PageHeader from "../components/PageHeader";
import { putData } from "../services/api/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateJob = () => {
  const { id } = useParams();
  const {
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    postedBy,
    skills,
    jobLink
  } = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [jobDesc, setJobDesc] = useState(description);

  const [selectedOption, setSelectedOption] = useState(skills);
  const location = useLocation();
  const navigate = useNavigate();
  // const { user } = useContext(AuthContext);
  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
  ];

  // Provide the modules prop with the configured toolbar
  const modules = {
    toolbar: toolbarOptions,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data.skills = selectedOption;
    // data.description = jobDesc;
    data.postedBy = postedBy;

    console.log(id);
    console.log(data);
    try {
      const jobData = await putData(`/update-job/${id}`, data);
      console.log(jobData);
      // setIsLoading(false);
      reset();
      navigate("/my-jobs");
    } catch (error) {
      console.error("Error posting a job:", error);
      setErrorMessage(error.response.data.message);
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  // console.log(watch("example"));

  return (
    <div className="bg-[#F9F9F9]">
      <div className="max-w-screen-xl container mx-auto xl:px-24 px-4 py-24">
        {/* <PageHeader title={"Update This Job"} path={"Edit Job"} /> */}

        {/* form */}
        <div className="bg-white py-10 px-4 lg:px-16">
          <h4 className="text-xl font-semibold">Edit Job</h4>
          <form className="space-y-5">
            <p className="text-red-500 text-sm">
              {errorMessage !== "" && errorMessage}
            </p>
            {/* 1st row */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Job Title</label>
                <input
                  defaultValue={jobTitle}
                  {...register("jobTitle")}
                  className="job-input-1"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Company Name</label>
                <input
                  placeholder="Ex: Microsoft"
                  defaultValue={companyName}
                  {...register("companyName")}
                  className="job-input-1"
                />
              </div>
            </div>

            {/* 2nd row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Minimum Salary</label>
                <input
                  placeholder="$20k"
                  defaultValue={minPrice}
                  {...register("minPrice")}
                  className="job-input-1"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Maximum Salary</label>
                <input
                  placeholder="$100k"
                  defaultValue={maxPrice}
                  {...register("maxPrice")}
                  className="job-input-1"
                />
              </div>
            </div>

            {/* 3rd row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Job Posting Date</label>
                <input
                  className="job-input-1 pr-2"
                  {...register("postingDate")}
                  placeholder="Ex: 2023-11-03"
                  type="date"
                  defaultValue={postingDate}
                />
              </div>

              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Job Location</label>
                <input
                  placeholder="Ex: New York"
                  defaultValue={jobLocation}
                  {...register("jobLocation")}
                  className="job-input-1"
                />
              </div>
            </div>

            {/* 4th row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Salary Type</label>
                <select
                  {...register("salaryType")}
                  className="job-input-1 py-2"
                >
                  <option value={salaryType}>{salaryType}</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Experience Level</label>
                <select
                  {...register("experienceLevel")}
                  className="job-input-1 py-2"
                >
                  <option value={experienceLevel}>{experienceLevel}</option>
                  <option value="NoExperience">No experience</option>
                  <option value="Internship">Internship</option>
                  <option value="Work remotely">Work remotely</option>
                </select>
              </div>
            </div>

            {/* 5th row */}
            <div className="">
              <label className="block mb-2 text-md">Required Skill Sets:</label>
              <CreatableSelect
                className="job-input py-4"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
              />
            </div>

            {/* 6th row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Company Logo</label>
                <input
                  type="url"
                  placeholder="Paste your image url: https://weshare.com/img1.jpg"
                  {...register("companyLogo")}
                  className="job-input-1"
                  defaultValue={companyLogo}
                />
              </div>

              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-md">Employment Type</label>
                <select
                  {...register("employmentType")}
                  className="job-input-1 py-2"
                >
                  <option value={employmentType}>{employmentType}</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>
            </div>

            {/* 7th row */}
            <div className="w-full">
              {/* <label className="block mb-2 text-md">Job Description</label> */}
              <div className="mb-8">
              {/* <ReactQuill
                theme="snow"
                modules={modules}
                value={description}
                onChange={setJobDesc}
                formats={["bold", "italic", "underline", "list"]}
              /> */}
              <label className="block mb-2 text-md">Provide the link to the job</label>
                <input
                  type="url"
                  placeholder="Paste the job url: https://apply.workable.com/trybe-2/j/8264066570/"
                  {...register("jobLink")}
                  className="job-input-1"
                  defaultValue={jobLink}
                />
            </div>
            </div>
          

            {/* <input
              type="submit"
              className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
            /> */}
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="inline-flex items-center justify-center px-8 py-2 bg-blue border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
