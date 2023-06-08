import { success, warning } from "@/lib/notif";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PaperView = () => {
  const [authorFormShow, setAuthorFormShow] = useState(false);
  const [affiliations, setAffiliations] = useState([]);
  const router = useRouter();
  const [paper, setPaper] = useState({
    title: "",
    abstract: "",
    presentor: "",
  });
  const [author, setAuthor] = useState({
    firstname: "",
    lastname: "",
    email: "",
    affiliations: "",
  });
  const [authorsList, setAuthorsList] = useState([]);

  async function getAffiliations(affiliationSelect) {
    let request = await fetch(
      "https://gist.githubusercontent.com/Athman-aa1808162/d7f5f9c884b3f26f5e490912cdb6713d/raw/81ce86423c51339f1ff2986c11b94da240cb9c30/institutions"
    );
    let data = await request.json();

    setAffiliations(data);
  }

  useEffect(() => {
    getAffiliations();
  }, []);

  function handlePaperInputChange(event) {
    const { name, value } = event.target;
    setPaper((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAuthorInputChange(event) {
    const { name, value } = event.target;

    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  }

  async function handleAddAuthor() {
    try {
      console.log("jskdf");
      if (
        author.firstname == "" ||
        author.lastname == "" ||
        author.email == "" ||
        author.affiliations == ""
      ) {
        warning("Please fill all the fields");
        return;
      }
      // const response = await axios.post("/api/authors", author);
      // console.log("New author created:", response.data);
      setAuthorsList((prevAuthorsList) => [...prevAuthorsList, author]);
      setAuthor({
        firstname: "",
        lastname: "",
        email: "",
        affiliations: "",
      });
    } catch (error) {
      console.error("Error creating author:", error);
    }
  }

  async function handleAddPaper(event) {
    event.preventDefault();
    try {
      if (
        paper.abstract == "" ||
        paper.title == "" ||
        paper.presentor == "" ||
        authorsList.length === 0
      ) {
        warning("Please fill all the fields");
        return;
      }
      const response = await axios.post("/api/paper", {
        ...paper,
        sessionId: router.query.sessionId,
        authors: JSON.stringify(authorsList.map((a) => a)),
      });
      // Reset the form
      console.log("New paper created:", response.data);
      if (response.data) {
        success("Paper Submitted Successfully");
      }
      setPaper({
        abstract: "",
        presentor: "",
        title: "",
      });
      setAuthorsList([]);
    } catch (error) {
      console.error("Error creating author:", error);
    }
  }

  return (
    <section class="paper">
      <h1>Create Paper</h1>
      <p>Paper Details</p>
      <form onSubmit={handleAddPaper} class="form" action="">
        <div class="title">
          <label for="">Paper Title</label>
          <input
            name="title"
            value={paper.title}
            onChange={handlePaperInputChange}
            class="input-title"
            type="text"
            placeholder="Enter paper Title"
          />
        </div>

        <div class="abstract">
          <label for="">Abstract</label>
          <textarea
            name="abstract"
            value={paper.abstract}
            onChange={handlePaperInputChange}
            class="input-abstract"
            cols="30"
            rows="10"
            placeholder="Enter paper Abstarct"
          ></textarea>
        </div>

        <div class="menus">
          <div class="authorsContainer">
            <div class="authors">
              <p>Authors</p>
              <div class="addAuthorButton">
                <button
                  onClick={() => setAuthorFormShow(!authorFormShow)}
                  class="add-author"
                  type="button"
                >
                  Add Author
                </button>
                <span class="custom-add">
                  <i class="ti ti-plus"></i>
                </span>
              </div>
              {authorFormShow && (
                <fieldset class="fieldset show">
                  <legend>
                    <b>Add Author Information</b>
                  </legend>
                  <label for="name">First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    id="fname"
                    value={author.firstname}
                    onChange={handleAuthorInputChange}
                    placeholder="Enter first name: "
                  />
                  <label for="name">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lname"
                    value={author.lastname}
                    onChange={handleAuthorInputChange}
                    placeholder="Enter last name: "
                  />
                  <label for="name">Email Address:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={author.email}
                    onChange={handleAuthorInputChange}
                    placeholder="Enter email address: "
                  />
                  <label for="affiliation">Affiliation:</label>
                  <div class="affiliationSelect">
                    <select
                      id="affiliation"
                      value={author.affiliations}
                      onChange={handleAuthorInputChange}
                      name="affiliations"
                    >
                      <option value="" selected disabled>
                        Select Affiliation
                      </option>
                      {affiliations.map((affiliation, idx) => (
                        <option key={idx} value={affiliation.name}>
                          {affiliation.name}
                        </option>
                      ))}
                    </select>
                    <span class="custom-arrow">
                      <i class="ti ti-chevron-down"></i>
                    </span>
                  </div>
                  <div class="action">
                    <button class="add" onClick={handleAddAuthor} type="button">
                      Add
                    </button>
                    <button
                      class="cancel"
                      type="button"
                      onClick={() => setAuthorFormShow(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </fieldset>
              )}
            </div>
            <div class="authors-list">
              <h4>Authors List:</h4>
              <ol type="1">
                {authorsList.map((author, idx) => (
                  <li key={author.id} class="targetAuthor">
                    {author.firstname} {author.lastname}
                    <i
                      onClick={() => {
                        setAuthorsList((prevAuthorsList) =>
                          prevAuthorsList.filter(
                            (_, innerIdx) => innerIdx === idx
                          )
                        );
                      }}
                      class="ti ti-x"
                    ></i>
                  </li>
                ))}
                `
              </ol>
            </div>
          </div>
          <div class="presentersContainer">
            <div class="presenters">
              <div class="presenter-menu">
                <p>Presenter</p>
                <select
                  name="presentor"
                  value={paper.presentor}
                  onChange={handlePaperInputChange}
                  id="presentersDropList"
                >
                  <option value="" selected disabled>
                    Select Presenter
                  </option>
                  {authorsList.map((author, idx) => (
                    <option key={author.id} value={idx}>
                      {author.firstname} {author.lastname}
                    </option>
                  ))}
                </select>
                <span class="custom-add">
                  <i class="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>
            <div class="presenters-list">
              <h4>Presenters List:</h4>
              <ol type="1">
                {authorsList?.find(
                  (a, idx) => idx === parseInt(paper.presentor)
                ) && (
                  <li class="selectedPresenter">
                    {
                      authorsList?.find(
                        (a, idx) => idx === parseInt(paper.presentor)
                      )?.firstname
                    }
                  </li>
                )}
              </ol>
            </div>
          </div>
        </div>
        <button class="submit">Submit</button>
      </form>
    </section>
  );
};

export default PaperView;
