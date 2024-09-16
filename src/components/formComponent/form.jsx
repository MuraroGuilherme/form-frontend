import React from "react";
import "./formStyle.css";

const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className="labelStyle">{label}</label>
        <input className="inputStyle" ref={ref} type={type} placeholder={type}/>
      </div>
    );
})

export const Form = ({onSubmit}) => {
        const emailRef = React.useRef();
        const confirmEmailRef = React.useRef();
        const passwordRef = React.useRef();
        const [errors, setErrors] = React.useState({ email: "", password: "", confirmEmail: "" });
        const [submitted, setSubmitted] = React.useState(false);

        const validate = (email, confirmEmail, password) => {
          const newErrors = { email: "", password: "", confirmEmail: "" };

          if (confirmEmail !== email) {
            newErrors.confirmEmail = "Emails do not match.";
          }
      
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            newErrors.email = "Insert a valid email.";
          }

          if (password.length < 6) {
            newErrors.password = "Password must have at least 6 characters";
          }
      
          setErrors(newErrors);

          return !newErrors.email && !newErrors.password && !newErrors.confirmEmail;
        }
        const handleSubmit = (event) => {
            event.preventDefault();
        
            const email = emailRef.current.value;
            const confirmEmail = confirmEmailRef.current.value;
            const password = passwordRef.current.value;
        
            if (validate(email, confirmEmail, password)) {
              const data = {
                email,
                confirmEmail,
                password,
              };
              onSubmit(data);

              emailRef.current.value = "";
              confirmEmailRef.current.value = "";
              passwordRef.current.value = "";

              setSubmitted(true);
            }
          };

          return (
            <div className="formDiv">
                <form className="formStyle" onSubmit={handleSubmit}>
                <div className="inputLabelDiv">
                    <Field ref={emailRef} label="Email" type="Email" />
                    {errors.email && <p className="errorStyle">{errors.email}</p>}
                    <Field ref={confirmEmailRef} label="Confirm Email" type="Email" />
                    {errors.confirmEmail && <p className="errorStyle">{errors.confirmEmail}</p>}
                    <Field ref={passwordRef} label="Password" type="Password" />
                    {errors.password && <p className="errorStyle">{errors.password}</p>}
                </div>
                <div>
                    <button className="submitStyle" type="submit">Submit</button>
                </div>
                </form>

                {submitted && <p className="successMessage">Form submitted successfully!</p>}
            </div>
          );
        };
