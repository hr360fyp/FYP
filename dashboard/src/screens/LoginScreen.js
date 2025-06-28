import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { login } from "../Redux/Actions/userActions";
import Message from "./../components/LoadingError/Error";
import ReCAPTCHA from "react-google-recaptcha";

const Login = ({ history }) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [error, setError] = useState("");
  const [loginPressed, setLoginPressed] = useState(false);

  const dispatch = useDispatch();
  const captchaRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  useEffect(() => {
    if (role === "Admin" && loginPressed === true &&  userInfo ) {
      history.push("/");
    } else if (role === "Employee" && loginPressed === true &&  userInfo) {
      history.push("/emp");
    } else if (role === "Client" && loginPressed === true &&  userInfo) {
      history.push("/client");
    } 
  }, [email, password, role, userInfo, history]);

  const handleCaptchaChange = (response) => {
    setCaptchaResponse(response);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Password regex pattern with your requirements
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    // if (captchaResponse) {
      if (!password.match(passwordPattern)) {
        setError(
          "Password must be between 6 and 20 characters and contain at least one special character and one number."
        );
      } else {
        setLoginPressed(true);
        dispatch(login(role, email, password));
        // captchaRef.current.reset();
      }
    
    // else {
    //   setError("Please fill the reCAPTCHA first.");
    // }
  };

  return (
    <>
      <Toast />
      <img src="/images/logo.png" className="logo1" alt="HR 360 Icon" />
      <div className="card shadow mx-auto" style={{ maxWidth: "380px" }}>
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form method="POST" action="/login" onSubmit={submitHandler}>
            <div className="mb-3">
              <select
                id="Role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option hidden>Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Client">Client</option>
              </select>
            </div>

            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength="40" // Set the maximum length to 40 characters
              />
            </div>

            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$"
                title="Password must be between 6 and 20 characters and contain at least one letter, one number, and one special character (@$!%*#?&)"
              />
            </div>

            <div className="captcha mb-4">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey="6LfOvOonAAAAAIWNgMT_xvjEG4MHIBhGcaZ8Bo0q"
                onChange={handleCaptchaChange}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
