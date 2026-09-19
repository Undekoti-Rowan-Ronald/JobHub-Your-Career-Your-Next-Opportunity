import { Link } from "react-router-dom";

function JobCard({ job }) {

    return (
        <div className="job-card">

            <div className="job-card-header">

                <h2>
                    {job.profile}
                </h2>

            </div>

            <p className="job-description">
                {job.description}
            </p>

            <div className="tech-container">

                {job.tech && job.tech.map((technology, index) => (

                    <span
                        className="tech-tag"
                        key={index}
                    >
                        {technology}
                    </span>

                ))}

            </div>

            <Link
                to="/job"
                state={{ job }}
                className="view-button"
            >
                View Job
            </Link>

        </div>
    );
}

export default JobCard;