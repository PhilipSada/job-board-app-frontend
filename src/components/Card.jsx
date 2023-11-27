import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";
// import { Link } from "react-router-dom";
// import DOMPurify from "dompurify";

const Card = ({ data }) => {
  // console.log(data);
  const {
    _id,
    companyLogo,
    jobTitle,
    companyName,
    jobLocation,
    employmentType,
    minPrice,
    maxPrice,
    postingDate,
    // description,
    skills,
    jobLink
  } = data;
  // const sanitizedHtml = DOMPurify.sanitize(description);

  return (
    <div>
      <section className="card hover:border-gray-400 rounded">
        <a
          href={jobLink}
          target="_blank"
          className="flex gap-4 flex-col sm:flex-row items-start"
        >
          <img src={companyLogo} alt={jobTitle} className="w-16 h-16 mb-4" />
          <div className="card-details">
            <h4 className="text-primary mb-1">{companyName}</h4>
            <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2">
                <FiMapPin /> {jobLocation}
              </span>
              <span className="flex items-center gap-2">
                <FiClock /> {employmentType}
              </span>
              <span className="flex items-center gap-2">
                <FiDollarSign /> {minPrice}-{maxPrice}k
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar /> {postingDate}
              </span>
            </div>
            <div className="flex flex-wrap">
            {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full inline-block mr-2 mb-1 tracking-wide text-blue-500 text-xs font-medium title-font py-0.5 px-1.5 border border-blue-500 uppercase"
                >
                  {skill.value}
                </span>
              ))}
            </div>

            {/* <p className="text-base text-primary/70 ">{description}</p> */}
            {/* <div className="overflow-hidden line-clamp-2 max-h-12">
              <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            </div> */}
          </div>
        </a>
      </section>
    </div>
  );
};

export default Card;
