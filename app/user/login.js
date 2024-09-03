"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";


export default function Login() {
  const usernameDB = "aidan"
  const passwordDB = "Pass@123"
  const [uname, setUname] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const handleLogin = async (event) => {
    event.preventDefault();
    if (!uname?.trim() || !password) {
      setError("Please fill out all fields.");
      return;
    }
    
    if(password !== passwordDB || uname !== usernameDB ){
      setError("Invalid username or password");
      return
    }

    setError("");
    router.push("/main")
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="bg-white flex flex-col items-center h-[100vh] justify-center bg-cover"
      style={{
        backgroundImage: `url("https://credencellc1.sharepoint.com/sites/CredenceIntranet/SiteAssets/Credence%20Intranet%20Page%20Design%20Wireframe/LandingPgImg.jpg")`,
      }}
    >
      <form
        className="usa-form"
        style={{ maxWidth: "450px", width: "450px" }}
        onSubmit={handleLogin}
      >
        <div className="usa-card__container py-8 px-8">
          <fieldset className="usa-fieldset">
            <h1 className="margin-bottom-0">Login</h1>
            {error && (
              <div className="usa-alert usa-alert--error" role="alert">
                <div className="usa-alert__body">
                  <h3 className="usa-alert__heading">Error</h3>
                  <p className="usa-alert__text">{error}</p>
                </div>
              </div>
            )}
            <label className="usa-label" htmlFor="username">
              Username
            </label>
            <input
              className="usa-input"
              id="username"
              name="username"
              type="text"
              onChange={(e)=>setUname(e.target.value)}
            />

            <label className="usa-label" htmlFor="password-sign-in">
              Password
            </label>
            <div className="password-wrapper" style={{ position: "relative" }}>
              <input
                className="usa-input"
                id="password-sign-in"
                name="password"
                type={showPassword ? "text" : "password"}
              onChange={(e)=>setPassword(e.target.value)}
                
                style={{ paddingRight: "2.5rem" }}
              />
              <button
                type="button"
                className="usa-show-password"
                aria-controls="password-sign-in"
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: "0",
                  margin: "0",
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <input className="usa-button" type="submit" value="Sign in" />
          </fieldset>
        </div>
      </form>
    </div>
  );
}
