import { Form } from "./components/formComponent/form";
import "./App.css";

const App = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="form-box">
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
