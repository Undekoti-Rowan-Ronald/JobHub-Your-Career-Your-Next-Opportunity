import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ApplyJob() {

    const location = useLocation();
    const navigate = useNavigate();

    const job = location.state?.job;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_no: "",
        current_company: "",
        current_CTC: "",
        expected_CTC: "",
        notice_period: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const API_URL = "http://localhost:8080";


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");


        try {

            const application = {
                name: formData.name,
                email: formData.email,
                phone_no: formData.phone_no,
                current_company: formData.current_company,
                current_CTC: Number(formData.current_CTC),
                expected_CTC: Number(formData.expected_CTC),
                notice_period: formData.notice_period
            };


            const response = await fetch(
                `${API_URL}/apply`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(application)
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to submit application"
                );

            }


            const data = await response.json();

            console.log("Application submitted:", data);

            setMessage(
                "Application submitted successfully!"
            );


            setFormData({
                name: "",
                email: "",
                phone_no: "",
                current_company: "",
                current_CTC: "",
                expected_CTC: "",
                notice_period: ""
            });


        } catch (error) {

            console.error(error);

            setError(
                "Failed to submit application. Please check the backend."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <main className="apply-container">

            <div className="apply-card">

                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>


                <h1>
                    Apply for Job
                </h1>


                {job && (

                    <div className="job-summary">

                        <h2>
                            {job.profile}
                        </h2>

                        <p>
                            {job.description}
                        </p>

                        <div className="tech-container">

                            {job.tech?.map(
                                (technology, index) => (

                                    <span
                                        className="tech-tag"
                                        key={index}
                                    >
                                        {technology}
                                    </span>

                                )
                            )}

                        </div>

                    </div>

                )}


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


                <form
                    className="apply-form"
                    onSubmit={handleSubmit}
                >

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        name="phone_no"
                        placeholder="Enter your phone number"
                        value={formData.phone_no}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Current Company
                    </label>

                    <input
                        type="text"
                        name="current_company"
                        placeholder="Enter current company"
                        value={formData.current_company}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Current CTC (LPA)
                    </label>

                    <input
                        type="number"
                        name="current_CTC"
                        placeholder="Example: 5.5"
                        step="0.1"
                        min="0"
                        value={formData.current_CTC}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Expected CTC (LPA)
                    </label>

                    <input
                        type="number"
                        name="expected_CTC"
                        placeholder="Example: 8.0"
                        step="0.1"
                        min="0"
                        value={formData.expected_CTC}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Notice Period (Months)
                    </label>

                    <input
                        type="number"
                        name="notice_period"
                        placeholder="Example: 3"
                        min="0"
                        value={formData.notice_period}
                        onChange={handleChange}
                        required
                    />


                    <button
                        type="submit"
                        className="submit-application-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Submitting..."
                            : "Submit Application"
                        }

                    </button>

                </form>

            </div>

        </main>

    );
}

export default ApplyJob;