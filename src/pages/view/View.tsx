import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./style.css";

const View = () => {
  const [occasion, setOccasion] = useState({
    event: "",
    message: "",
    name: "",
    theme: "",
  });

  let { occasionId, code } = useParams();

  console.log("data", occasionId, code);

  const getOccasion = () => {
    axios
      .get(`http://localhost:8080/occasions/${occasionId}/${code}`)
      .then((res) => {
        setOccasion(res.data);
      });
  };

  console.log("occasion", occasion);

  useEffect(() => {
    getOccasion();
  }, []);

  return (
    <div
      className="viewImage"
      style={{
        backgroundImage: `url(${occasion.theme})`,
      }}
    >
      <div className="viewMessage">
        <div className="messageSection">
          <h2>{occasion.message}</h2>
        </div>

        <div className="nameSection">
          <h2>From</h2>
          <h1>{occasion.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default View;
