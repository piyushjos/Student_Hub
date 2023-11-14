import React, { useEffect, useState } from "react";
import constant from "../utils/constants";
import axios from "axios";
import { message } from "antd";
import { useSearchParams, Link } from "react-router-dom";
import fileDownload from "js-file-download";

function HelloSolution(props) {
  const [isSolutionAvailable, setIsSolutionAvailable] = useState(false);
  const [solution, setSolution] = useState("");
  const [searchParams] = useSearchParams();
  let myid = searchParams.get("id");

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const onSignSuccess = async () => {
    console.log("hello");

    try {
      const Formdata = new FormData();
      Formdata.append("_id", myid);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/download_solution`,
        Formdata
      );
      console.log(response);
      if (response.data.status == 200) {
        if (response.data.data.length !== 0) {
          setIsSolutionAvailable(true);
          setSolution(response.data.data[0].solution_documentName);
        }
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    onSignSuccess();
  }, []);

  return (
    <>
      {isSolutionAvailable ? (
        <button
          onClick={() => {
            handleDownload(
              `${constant.BASE_IP}/uploads/Solutiondata/${solution}`,
              "test-download.pdf"
            );
          }}
        >
          Download Image
        </button>
      ) : (
        "Solution not uploaded yet"
      )}
    </>
  );
}

export default HelloSolution;
