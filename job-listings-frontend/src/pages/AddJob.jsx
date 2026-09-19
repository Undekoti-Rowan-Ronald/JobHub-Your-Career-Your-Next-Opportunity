import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJob() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState("");

    const [description, setDescription] = useState("");

    const [tech, setTech] = useState("");

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const API_URL = "http://localhost:8080";


    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");

        setError("");


        if (!profile || !description || !tech) {

            setError("Please fill all fields.");

            return;

        }


        const job = {

            profile: profile,

            description: description,

            tech: tech
                .split(",")
                .map(item => item.trim())
                .filter(item => item !== "")

        };


        try {

            setLoading(true);

            const response = await fetch(
                `${API_URL}/send_post`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(job)
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to add job"
                );

            }


            setMessage(
                "Job successfully added!"
            );


            setProfile("");

            setDescription("");

            setTech("");


            setTimeout(() => {

                navigate("/");

            }, 1000);


        } catch (error) {

            console.error(error);

            setError(
                "Unable to add job. Check your backend."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="form-container">

            <div className="form-card">

                <h1>
                    Add Job Listing
                </h1>

                <p className="form-subtitle">
                    Create a new job opportunity.
                </p>


                {message && (

                    <div className="success-message">
                        {message}
                    </div>

                )}


                {error && (

                    <div className="error-message">
                        {error}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <label>
                        Job Profile
                    </label>

                    <input
                        type="text"
                        placeholder="Example: Java Developer"
                        value={profile}
                        onChange={(e) =>
                            setProfile(e.target.value)
                        }
                    />


                    <label>
                        Description
                    </label>

                    <textarea
                        placeholder="Enter job description"
                        rows="6"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />


                    <label>
                        Technologies
                    </label>

                    <input
                        type="text"
                        placeholder="Java, Spring Boot, MongoDB"
                        value={tech}
                        onChange={(e) =>
                            setTech(e.target.value)
                        }
                    />

                    <small>
                        Separate technologies using commas.
                    </small>


                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Adding..."
                            : "Add Job"
                        }

                    </button>

                </form>

            </div>

        </main>

    );
}

export default AddJob;