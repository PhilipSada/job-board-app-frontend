import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from 'sweetalert2'
import DOMPurify from "dompurify";

const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);

  const handleJobApply = async () => {
    // console.log("btn clicked")
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "CV or Resume URL address",
      inputPlaceholder: "Enter the URL"
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Appliction Submited Successfully!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    
  }
  return (
    <div className="">
           <div className="mb-12">
                <h2 className="text-2xl font-bold text-black font-inter">
                    {job.jobTitle}
                </h2>
                <div className="md:flex-grow mr-8 mt-2 flex items-center justify-start">
                    {
                        job.skills.map((skill, index)=>(
                            <span key={index} className="rounded-full inline-block mr-2 tracking-wide text-blue-500 text-xs font-medium title-font py-0.5 px-1.5 border border-blue-500 uppercase">{ skill.value }</span>
                        ))
                    }
                </div>
            </div>
            <div>
                <div>{job.description}</div>
            </div>
       
    </div>
  );
};

export default JobDetails;