import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

function Home() {

    const [jobs, setJobs] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const API_URL = "http://localhost:8080";


    // Get all jobs
    const getJobs = async () => {

        try {

            setLoading(true);

            const response = await fetch(`${API_URL}/myposts`);

            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }

            const data = await response.json();

            setJobs(data);

            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "Unable to connect to the Spring Boot backend."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        getJobs();

    }, []);


    // Search jobs
    const handleSearch = async () => {

        if (!search.trim()) {

            getJobs();

            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${API_URL}/search/${encodeURIComponent(search)}`
            );

            if (!response.ok) {
                throw new Error("Search failed");
            }

            const data = await response.json();

            setJobs(data);

            setError("");

        } catch (error) {

            console.error(error);

            setError("Search failed.");

        } finally {

            setLoading(false);

        }
    };


    const handleKeyDown = (event) => {

        if (event.key === "Enter") {
            handleSearch();
        }

    };


    return (
        <div>

            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Find Your Next Job
                    </h1>

                    <p>
                        Explore job opportunities and find
                        the right technology stack for your career.
                    </p>

                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Search jobs, technologies..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                        />

                        <button onClick={handleSearch}>
                            Search
                        </button>

                    </div>

                </div>

            </section>


            <main className="container">

                <div className="section-header">

                    <h2>
                        Available Jobs
                    </h2>

                    <button
                        className="refresh-button"
                        onClick={getJobs}
                    >
                        Refresh
                    </button>

                </div>


                {loading && (

                    <div className="message">
                        Loading jobs...
                    </div>

                )}


                {error && (

                    <div className="error-message">
                        {error}
                    </div>

                )}


                {!loading && !error && jobs.length === 0 && (

                    <div className="message">
                        No jobs found.
                    </div>

                )}


                <div className="jobs-grid">

                    {!loading && jobs.map((job, index) => (

                        <JobCard
                            key={index}
                            job={job}
                        />

                    ))}

                </div>

            </main>

        </div>
    );
}

export default Home;