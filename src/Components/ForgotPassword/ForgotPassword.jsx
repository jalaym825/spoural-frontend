import React, { useState } from 'react';
import CheckOTP from './CheckOTP';
import NewPassword from './NewPassword';
import ResetComplete from './ResetComplete';
import ResetPassword from './ResetPassword';

const ForgotPassword = () => {
  const [component, setComponent] = useState("resetPassword");
  const [email, setEmail] = useState("");
  const components = {
    "resetPassword": <ResetPassword email={"okoko"} setEmail={setEmail} setComponent={setComponent} />,
    "checkOTP": <CheckOTP setComponent={setComponent} />,
    "newPassword": <NewPassword email={email} setComponent={setComponent}/>,
    "resetComplete": <ResetComplete />  
  }
  
  return (
    <>
      {
        components[component]
      }
    </>
  )
}

export default ForgotPassword
