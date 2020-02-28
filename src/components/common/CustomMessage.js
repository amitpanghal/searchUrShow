import React from "react";

const CustomMessage = ({ checkForProp, messageText }) => {
  if (checkForProp) {
    return (
      <div className="d-flex flex-column m-auto">
        <p name={messageText} className="result-loading">
          {messageText}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default CustomMessage;
