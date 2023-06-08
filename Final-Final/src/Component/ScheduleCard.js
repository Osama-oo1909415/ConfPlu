import Image from "next/image";
import React from "react";

const ScheduleCard = ({ session }) => {
  return (
    <div key={session.id} class="sessionCard">
      <div class="sessionContent">
        <ul>
          <li>
            <i class="bi bi-body-text"></i> Title: <p>{session?.title}</p>
          </li>
          <li>
            <i class="bi bi-geo-alt"></i> Location: <p>{session.location}</p>
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

            {/* <div class="paperAbstract">
                      <div class="abstarctHeader">
                        <h3>abstract: {paper?.abstract}</h3>
                      </div>
                    </div> */}

            <div class="paperTime">
              <h3>Time:</h3>
              <p>
                {session.from} - {session.to}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCard;
