import { success, warning } from "@/lib/notif";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const OrganizeView = () => {
  const [view, setView] = useState("session");
  const [sessionList, setSessionList] = useState([]);
  const [paperList, setPaperList] = useState([]);
  const router = useRouter();
  const [session, setSession] = useState({
    date: "",
    from: "",
    location: "",
    to: "",
    paper: "",
  });
  const [locations, setLocations] = useState([]);
  const [dates, setDates] = useState([]);
  async function getLocations() {
    const locations =
      "https://gist.githubusercontent.com/Athman-aa1808162/3f0f92091de211b973986d438ca65e01/raw/271b581b9c16265988cbf4dd7938285328449a3c/locations";

    let response = await fetch(locations);
    let data = await response.json();
    setLocations(data);

    return data;
  }
  async function getDates() {
    const dates =
      "https://gist.githubusercontent.com/Athman-aa1808162/61e619e221c2e44ad579b3ea0df7716b/raw/0b094e6bebedd9ea7369133739e0959362179a6b/Dates";

    let response = await fetch(dates);
    let data = await response.json();
    console.log(data);
    setDates(data);
    return data;
  }
  function handleInputCahnge(event) {
    const { name, value } = event.target;
    console.log(value);
    setSession((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (
        session.paper == "" ||
        session.location == "" ||
        session.date == "" ||
        session.from === "" ||
        session.to === ""
      ) {
        warning("Please fill all the fields");
        return;
      }
      console.log(router.query.update);
      if (router.query.update) {
        const response = await axios.put(
          `/api/session?id=${router.query.update}`,
          {
            ...session,
            paperId: session.paper,
          }
        );
        console.log("New paper created:", response.data);
        if (response.data) {
          success("Session Updated Successfully");
        }
        router.push({ query: {} });
      } else {
        const response = await axios.post("/api/session", {
          ...session,
          paperId: session.paper,
        });
        console.log("New paper created:", response.data);
        if (response.data) {
          success("Session Submitted Successfully");
        }
      }
      fetchData();
      // Reset the form
      setSession({
        title: "",
        date: "",
        from: "",
        location: "",
        to: "",
        paper: "",
      });
      setPaperList([]);
    } catch (error) {
      console.error("Error creating author:", error);
    }
  }
  async function fetchData() {
    try {
      await getLocations();
      await getDates();
      const response = await axios.get("/api/paper");
      setPaperList(response.data);

      const sResponse = await axios.get("/api/session");
      setSessionList(sResponse.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }

  const handleLinkPaper = async (event) => {
    event.preventDefault();
    const response = await axios.put(`/api/paper?id=${session.paper}`, {
      sessionId: router.query.sessionId,
      from: session.from,
      to: session.to,
    });
    console.log("New paper updated:", response.data);
    if (response.data) {
      success("Session Linked Successfully");
    }
    await fetchData();
    // Reset the form
    setSession({
      title: "",
      date: "",
      from: "",
      location: "",
      to: "",
      paper: "",
    });
    setView("session");
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const sResponse = await axios.delete(`/api/session?id=${id}`);
    if (sResponse.data) {
      setSessionList((prev) => prev.filter((session) => session.id !== id));
    }
  };
  const handleDeletePaper = async (id) => {
    const sResponse = await axios.delete(`/api/paper?id=${id}`);
    if (sResponse.data) {
      await fetchData();
    }
  };
  console.log(sessionList);

  return (
    <div class="organizer">
      <div class="navigation-menu">
        <a class="sessions" onClick={() => setView("session")}>
          <span>
            <i class="ti ti-home"></i>
          </span>{" "}
          Sessions
        </a>
        <a class="createSessionBtn" onClick={() => setView("form")}>
          <span>
            <i class="ti ti-plus"></i>
          </span>
          Create Session
        </a>
      </div>

      {view === "session" && (
        <>
          {sessionList.map((session) => (
            <div key={session.id} class="sessionCard">
              <div class="sessionContent">
                <ul>
                  <li>
                    <i class="bi bi-body-text"></i> Title:{" "}
                    <p>{session?.title}</p>
                  </li>
                  <li>
                    <i class="bi bi-geo-alt"></i> Location:{" "}
                    <p>{session.location}</p>
                  </li>
                  <li>
                    <i class="bi bi-calendar3"></i> Date: <p>{session.date}</p>
                  </li>
                </ul>
              </div>
              <div className="papersContainer">
                {session.paper.map((paper) => (
                  <div key={paper.id} class="paperTemplate">
                    <div class="title">
                      <h1>{paper.title}</h1>
                      {paper.review && <h6>Reviewed</h6>}
                    </div>
                    {/* <div class="paperAuthors">
                      <h3> Authors:</h3>
                      <ul>
                        {paper?.authors?.map((author, idx) => {
                          return (
                            <li key={idx}>
                              {author.firstname} {author.lastname}
                            </li>
                          );
                        })}
                      </ul>
                    </div> */}
                    <div class="paperPresenter">
                      <h3>Presenter:</h3>
                      <ul>
                        <li>{paper?.presentor?.firstname}</li>
                      </ul>
                    </div>

                    {paper.to && paper.from && (
                      <div class="paperTime">
                        <h3>Time:</h3>
                        <p>
                          {paper.from} - {paper.to}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => handleDeletePaper(paper.id)}
                      class="deleteSession"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div class="cardButtons">
                <button
                  class="updateSession"
                  onClick={() => {
                    setView("form_paper");
                    router.push({ query: { sessionId: session.id } });
                  }}
                >
                  Add paper
                </button>
                <button
                  class="updateSession"
                  onClick={() => {
                    router.push({ query: { update: session.id } });
                    setView("form");
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(session.id)}
                  class="deleteSession"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {view === "form" && (
        <div class="organizerContnet">
          <div class="organizerForm">
            <form action="" onSubmit={handleSubmit}>
              <div class="sessionTitle">
                <label for="">Session Title</label>
                <input
                  placeholder="Session Title"
                  required
                  name="title"
                  value={session.title}
                  onChange={handleInputCahnge}
                />
              </div>
              <div class="acceptedPapers">
                <label for="">Accepted Papers</label>
                <select
                  name="paper"
                  value={session.paper}
                  onChange={handleInputCahnge}
                  id="accptedPapers"
                >
                  <option value="" selected disabled>
                    Select a Paper
                  </option>
                  {paperList.map((paper, idx) => (
                    <option
                      disabled={
                        (paper.review?.evalutation !== "2" &&
                          paper.review?.contribution !== "5") ||
                        paper.Session?.length > 0
                      }
                      key={idx}
                      value={paper.id}
                    >
                      {paper.title}
                    </option>
                  ))}
                </select>
              </div>
              <div class="presenter">
                <label for="">Presenter</label>
                <input
                  type="text"
                  id="presenter"
                  value={
                    `${
                      paperList.find((p) => p.id === session.paper)?.presentor
                        ?.firstname
                    } ${
                      paperList.find((p) => p.id === session.paper)?.presentor
                        ?.lastname
                    }` || "Presenter Name"
                  }
                  disabled
                />
              </div>
              <div class="location">
                <label for="">Location</label>
                <select
                  name="location"
                  value={session.location}
                  onChange={handleInputCahnge}
                  id="location"
                >
                  <option value="" selected disabled>
                    Select a Location
                  </option>
                  {locations.map((location, idx) => {
                    return (
                      <option key={idx} value={location.location}>
                        {location.location}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="date">
                <label for="">Date</label>
                <select
                  name="date"
                  value={session.date}
                  onChange={handleInputCahnge}
                  id="date"
                >
                  <option value="" selected disabled>
                    Select a Date
                  </option>
                  {dates.map(({ date }, idx) => {
                    return (
                      <option key={idx} value={date}>
                        {date}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="time">
                <label for="">Select A Time</label>
                <div class="timeInputs">
                  <div class="startTime">
                    <label for="">From:</label>
                    <input
                      type="time"
                      name="from"
                      onChange={handleInputCahnge}
                      id="startTime"
                    />
                  </div>
                  <div class="endTime">
                    <label for="">To:</label>
                    <input
                      type="time"
                      name="to"
                      onChange={handleInputCahnge}
                      id="endTime"
                    />
                  </div>
                </div>
              </div>
              <div class="addSession">
                <button type="submit" class="addSessionBtn" href="#">
                  {" "}
                  ADD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {view === "form_paper" && (
        <div class="organizerContnet">
          <div class="organizerForm">
            <form action="" onSubmit={handleLinkPaper}>
              <div class="acceptedPapers">
                <label for="">Accepted Papers</label>
                <select
                  name="paper"
                  value={session.paper}
                  onChange={handleInputCahnge}
                  id="accptedPapers"
                >
                  <option value="" selected disabled>
                    Select a Paper
                  </option>
                  {paperList.map((paper, idx) => (
                    <option
                      disabled={
                        (paper.review?.evalutation !== "2" &&
                          paper.review?.contribution !== "5") ||
                        paper.Session?.length > 0
                      }
                      key={idx}
                      value={paper.id}
                    >
                      {paper.title}
                    </option>
                  ))}
                </select>
              </div>
              <div class="time">
                <label for="">Select A Time</label>
                <div class="timeInputs">
                  <div class="startTime">
                    <label for="">From:</label>
                    <input
                      type="time"
                      name="from"
                      onChange={handleInputCahnge}
                      id="startTime"
                    />
                  </div>
                  <div class="endTime">
                    <label for="">To:</label>
                    <input
                      type="time"
                      name="to"
                      onChange={handleInputCahnge}
                      id="endTime"
                    />
                  </div>
                </div>
              </div>
              <div class="addSession">
                <button type="submit" class="addSessionBtn">
                  {" "}
                  ADD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizeView;
