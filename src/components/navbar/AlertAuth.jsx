import React from 'react';

import './savemenu.css';

const AlertAuth = ({ setShowAlert, alertMessage, setAlertMessage }) => {

const closeWindow = () => {
  setShowAlert(false);

  if(alertMessage!="Пройдите авторизацию"){
    setAlertMessage("Пройдите авторизацию");
  }
}
  return (
    <div className="alert-auth-message">
        <span class="close" onClick={closeWindow}>&times;</span>
        <p>{alertMessage}</p>
    </div>
  );
}

export default AlertAuth;