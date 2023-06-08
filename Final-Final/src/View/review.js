import ReviewCard from "@/Component/ReviewCard";
import { success, warning } from "@/lib/notif";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewView = () => {
  const [paperList, setPaperList] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("/api/paper");
      setPaperList(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="reviewContainer">
      <h1>Assigned Paper</h1>
      <div className="papersContainer">
        {paperList.map((paper, idx) => (
          <ReviewCard key={idx} paper={paper} refetch={fetchData} />
        ))}
      </div>
    </div>
  );
};

export default ReviewView;
