import { success, warning } from "@/lib/notif";
import axios from "axios";
import React, { useState } from "react";

const ReviewCard = ({ paper, refetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);
  const [review, setReview] = useState({
    contribution: "",
    weakness: "",
    strength: "",
    evalutation: "",
  });
  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(value);
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (
        review.contribution === "" ||
        review.evalutation === "" ||
        review.weakness === "" ||
        review.strength === ""
      ) {
        warning("Please fill all the fields");
        return;
      }
      const response = await axios.post("/api/review", {
        ...review,
        paperId: paper.id,
      });
      console.log("New paper created:", response.data);
      if (response.data) {
        success("Review Submitted Successfully");
      }
      refetch();
      // Reset the form
      setReview({
        contribution: "",
        strength: "",
        evalutation: "",
        paper: "",
      });
    } catch (error) {
      console.error("Error creating author:", error);
    }
  }

  return (
    <div class="paperTemplate">
      <div class="title">
        <h1>{paper.title}</h1>
        {paper.review && <h6>Reviewed</h6>}
      </div>
      <div class="paperAuthors">
        <h3> Authors:</h3>
        <ul>
          {paper.authors.map((author, idx) => {
            return (
              <li key={idx}>
                {author.firstname} {author.lastname}
              </li>
            );
          })}
        </ul>
      </div>
      <div class="paperPresenter">
        <h3>Presenter:</h3>
        <ul>
          <li>{paper?.presentor?.firstname}</li>
        </ul>
      </div>
      <div class="paperAbstract">
        <div
          onClick={() => setShowAbstract(!showAbstract)}
          class="abstarctHeader"
        >
          <h3>abstract</h3>
          <i class="ti ti-chevron-down"></i>
        </div>
        {showAbstract && (
          <div class="abstractContent show">
            <p>{paper.abstract}</p>
          </div>
        )}
      </div>
      <div class="paperEvalution">
        <div onClick={() => setShowForm(!showForm)} class="evaluationHeader">
          <h3>Evaluate</h3>
          <i class="ti ti-chevron-down"></i>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} class="evaluationContent show">
            <select
              name="evalutation"
              onChange={handleInputChange}
              value={review.evalutation}
              id="evaluation"
            >
              <option value="" selected disabled>
                Overall evaluation
              </option>
              <option value="2">Strong Accept</option>
              <option value="1">Accept</option>
              <option value="0">Borderline</option>
              <option value="-1">Reject</option>
              <option value="-2">Strong Reject</option>
            </select>
            <select
              name="contribution"
              onChange={handleInputChange}
              value={review.contribution}
              id="contribution"
            >
              <option value="" selected disabled>
                Overall contribution
              </option>
              <option value="5">major & significant</option>
              <option value="4">Clear</option>
              <option value="3">Minor</option>
              <option value="2">No Obvious</option>
              <option value="1">Obvious</option>
            </select>
            <div class="paperStrength">
              <label for="">Paper Strength</label>
              <textarea
                name="strength"
                onChange={handleInputChange}
                value={review.strength}
                id=""
                cols="30"
                rows="3"
                placeholder="Enter Paper Strength"
              ></textarea>
            </div>
            <div class="paperWeakness">
              <label for="">Paper weakness</label>
              <textarea
                name="weakness"
                onChange={handleInputChange}
                value={review.weakness}
                cols="30"
                rows="3"
                placeholder="Enter Paper Weakness"
              ></textarea>
            </div>
            <button type="submit" class="evaluateBtn">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
