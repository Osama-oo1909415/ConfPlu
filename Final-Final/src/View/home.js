import ScheduleCard from "@/Component/ScheduleCard";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const HomeView = ({ statistics }) => {
  const [sessionList, setSessionList] = useState([]);
  const [paperList, setPaperList] = useState([]);
  const [dates, setDates] = useState([]);

  async function getDates() {
    const dates =
      "https://gist.githubusercontent.com/Athman-aa1808162/61e619e221c2e44ad579b3ea0df7716b/raw/0b094e6bebedd9ea7369133739e0959362179a6b/Dates";

    let response = await fetch(dates);
    let data = await response.json();
    console.log(data);
    setDates(data);
    return data;
  }

  async function fetchData() {
    try {
      await getDates();

      const sResponse = await axios.get("/api/session");
      setSessionList(sResponse.data);

      const response = await axios.get("/api/paper");
      setPaperList(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(paperList);

  return (
    <main class="main">
      <section class="hero" data-aos="fade-down">
        <div class="hero-text">
          <p>Create & explore conference events</p>
          <h1>
            Conference Management <br />
            System
          </h1>
          <div class="statistics">
            <div class="title">
              <h2>Statistics</h2>
            </div>
            <div class="info">
              <div class="all">
                <h3>Submitted Papers</h3>
                <p>{statistics?.paperCount}</p>
              </div>
              <div class="accepted">
                <h3>Accepted Papers</h3>
                <p>{statistics?.acceptedPapers}</p>
              </div>
              <div class="rejected">
                <h3>Rejected Papers</h3>
                <p>{statistics?.rejectedPapers}</p>
              </div>
              <div class="AVG">
                <h3>AVG authors per Paper</h3>
                <p>{statistics?.averagePerUser}</p>
              </div>
              <div class="conference">
                <h3>Total Conferences</h3>
                <p>2</p>
              </div>
            </div>
          </div>
          <a href="#" class="start button">
            Start Now
          </a>
        </div>
        <Image
          class=".hero-image"
          src="/assets/images/hero-image.png"
          alt="hero image"
          width={600}
          height={600}
        />
      </section>
      <section class="schedule" id="schedule" data-aos="fade-down">
        <div class="row-1">
          <div class="title">
            <p>Events</p>
            <h2>Schedule</h2>
          </div>
          <div class="filter">
            <p>TIMEFRAME</p>
            <div class="select-menu">
              <select name="" id="dates">
                <option value="" disabled selected>
                  Choose a Date
                </option>
              </select>
              <span class="custom-arrow">
                <i class="ti ti-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="organizer">
          {sessionList.map((session, idx) => (
            <ScheduleCard key={idx} session={session} />
          ))}
        </div>
        <div class="row-3">
          <a href="">Load More</a>
        </div>
      </section>
      <footer class="footer" id="footer" data-aos="fade-down">
        <div class="footer-row-1">
          <div class="logo">
            <img src="./assets/images/single-logo.svg" alt="logo" />
          </div>

          <div class="list">
            <h4>USEFUL LINKS</h4>
            <ul>
              <li>
                <a href="#">HOME</a>
              </li>
              <li>
                <a href="#schedule">SCHEDULE</a>
              </li>
              <li>
                <a href="#footer">ABOUT</a>
              </li>
            </ul>
          </div>

          <div class="news-letter">
            <h3>Join Newsletter</h3>
            <p>
              Subscribe our newsletter to get more free design <br />
              course and resource
            </p>
            <div class="email-input">
              <input type="email" placeholder="Enter your email" required />
              <span>
                <i class="ti ti-arrow-narrow-right"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>Copyright © 2023 CMPS350. All rights reserved</p>
        </div>
      </footer>
    </main>
  );
};

export default HomeView;
