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
        const confirmPasswordRef = React.useRef();
        const passwordRef = React.useRef();
        const [errors, setErrors] = React.useState({ email: "", password: "", confirmPassword: "" });
        const [submitted, setSubmitted] = React.useState(false);

        const validate = (email, password, confirmPassword) => {
          const newErrors = { email: "", password: "", confirmPassword: "" };

          
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            newErrors.email = "Insert a valid email.";
          }
          
          if (password.length < 6) {
            newErrors.password = "Password must have at least 6 characters";
          }
          
          if (confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match.";
          }
          setErrors(newErrors);

          return !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
        }
        const handleSubmit = (event) => {
            event.preventDefault();
        
            const email = emailRef.current.value;
            const confirmPassword = confirmPasswordRef.current.value;
            const password = passwordRef.current.value;
        
            if (validate(email, confirmPassword, password)) {
              const data = {
                email,
                password,
                confirmPassword,
              };
              onSubmit(data);

              emailRef.current.value = "";
              confirmPasswordRef.current.value = "";
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
                    <Field ref={passwordRef} label="Password" type="Password" />
                    {errors.password && <p className="errorStyle">{errors.password}</p>}
                    <Field ref={confirmPasswordRef} label="Confirm Password" type="password" />
                    {errors.confirmPassword && <p className="errorStyle">{errors.confirmPassword}</p>}
                </div>
                <div>
                    <button className="submitStyle" type="submit">Submit</button>
                </div>
                </form>

                {submitted && <p className="successMessage">Form submitted successfully!</p>}
            </div>
          );
        };
