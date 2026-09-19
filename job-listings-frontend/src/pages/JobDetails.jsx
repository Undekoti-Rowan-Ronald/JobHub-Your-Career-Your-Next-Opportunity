import { Link, useLocation, useNavigate } from "react-router-dom";

function JobDetails() {

    const location = useLocation();

    const navigate = useNavigate();

    const job = location.state?.job;


    // If no job data is available
    if (!job) {

        return (

            <main className="container">

                <div className="message">

                    <h2>
                        Job not found
                    </h2>

                    <p>
                        The job details are not available.
                    </p>

                    <br />

                    <Link
                        to="/"
                        className="view-button"
                    >
                        Back to Jobs
                    </Link>

                </div>

            </main>

        );

    }


    // Open Apply Job page
    const handleApply = () => {

        navigate("/apply", {
            state: {
                job: job
            }
        });

    };


    return (

        <main className="details-container">

            <div className="details-card">

                {/* Back button */}

                <Link
                    to="/"
                    className="back-link"
                >
                    ← Back to Jobs
                </Link>


                {/* Job Profile */}

                <h1>
                    {job.profile}
                </h1>


                {/* Description */}

                <h3>
                    Job Description
                </h3>

                <p className="details-description">
                    {job.description}
                </p>


                {/* Technologies */}

                <h3>
                    Technologies
                </h3>

                <div className="tech-container">

                    {job.tech && job.tech.length > 0 ? (

                        job.tech.map(
                            (technology, index) => (

                                <span
                                    className="tech-tag"
                                    key={index}
                                >
                                    {technology}
                                </span>

                            )
                        )

                    ) : (

                        <p>
                            No technologies specified.
                        </p>

                    )}

                </div>


                {/* Apply */}

                <div className="apply-section">

                    <button
                        className="apply-button"
                        onClick={handleApply}
                    >
                        Apply Now
                    </button>

                </div>

            </div>

        </main>

    );
}

export default JobDetails;