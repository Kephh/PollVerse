import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UpdateVotes() {
	const [poll, setPoll] = useState(null);
	const [selectedOption, setSelectedOption] = useState("");
	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPoll = async () => {
			try {
				const res = await axios.get("http://localhost:8000/polls/fetch");
				setPoll(res.data);
				setLoading(false);
			} catch (err) {
				setErrors(["Failed to load poll."]);
				setLoading(false);
			}
		};
		fetchPoll();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		setSuccess("");

		if (!selectedOption) {
			setErrors(["Please select an option."]);
			return;
		}

		try {
			const res = await axios.patch("http://localhost:8000/polls/updateVotes", {
				selectedOption,
			});
			setSuccess(res.data.message);
			setSelectedOption("");
		} catch (err) {
			setErrors(["Failed to submit vote."]);
		}
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				{loading && <p>Loading poll...</p>}
				{poll && (
					<>
						<h2>
							<textarea
								value={poll.question}
								disabled
								readOnly
							/>
						</h2>
						{["option1", "option2", "option3", "option4"].map((optKey) => (
							<label key={optKey}>
								<input
									type="radio"
									name="pollOption"
									value={poll[optKey]}
									checked={selectedOption === poll[optKey]}
									onChange={(e) => setSelectedOption(e.target.value)}
								/>
								{poll[optKey]}
							</label>
						))}

						<button
							type="submit"
							disabled={!selectedOption}>
							Submit Vote
						</button>
						<button
							type="button"
              disabled={!selectedOption}
							onClick={() => setSelectedOption("")}>
							Reset
						</button>
					</>
				)}
			</form>

			{errors.length > 0 && (
				<ul style={{ color: "red" }}>
					{errors.map((err, idx) => (
						<li key={idx}>{err}</li>
					))}
				</ul>
			)}

			{success && <div style={{ color: "green" }}>{success}</div>}
		</section>
	);
}
