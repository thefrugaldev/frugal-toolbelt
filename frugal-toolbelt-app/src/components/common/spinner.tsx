import React from "react";
import "../../styles/variables.scss";

const Spinner: React.FC = () => {
  return (
    <>
      <div className="loading"></div>
      <style jsx>
        {`
          .loading {
            width: 100px;
            height: 100px;
            border-radius: 100%;
            position: relative;
            margin: 0 auto;
          }
          .loading:before,
          .loading:after {
            content: "";
            position: absolute;
            top: -10px;
            left: -10px;
            width: 100%;
            height: 100%;
            border-radius: 100%;
            border: 10px solid transparent;
            border-top-color: green;
          }
          .loading:before {
            z-index: 100;
            animation: spin 1s infinite;
          }

          .loading:after {
            border: 10px solid #ccc;
          }
          @keyframes spin {
            0% {
              -webkit-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
              -o-transform: rotate(0deg);
              transform: rotate(0deg);
            }

            100% {
              -webkit-transform: rotate(360deg);
              -ms-transform: rotate(360deg);
              -o-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default Spinner;