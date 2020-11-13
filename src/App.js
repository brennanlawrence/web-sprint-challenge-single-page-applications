import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Form from "./Form";
import Home from "./Home";
import axios from "axios";
import formSchema from "./formSchema";

const defaultValues = {
  name: "",
  size: "",
  cheese: false,
  sauce: false,
  olives: false,
  meat: false,
  specialInstructions: "",
}

const initialFormErrors ={
  name: "",
}



const App = () => {

  const [ formValues, setFormValues ] = useState(defaultValues);
  const [ savedFormInfo, setSavedFormInfo ] = useState([]);

  const postNewPizza = (newData) => {
    axios
      .post("https://reqres.in/", newData)
      .then((res) => {
        setSavedFormInfo([res.data, formValues])
        setFormValues(defaultValues)
      })
      .catch(err => {
        console.log(err);
        debugger;
      })
  }

  const change = (evt) => {
    const { name, value, type, checked } = evt.target;
    const updatedInfo = type === "checkbox" ? checked : value;
    setFormValues({ ...formValues, [name]: updatedInfo });
  };

  const submit = (evt) => {
    evt.preventDafault();
    console.log("submit");
    const newData = {
      name: formValues.name.trim(),
      size: formValues.size,
      toppings: {
        cheese: formValues.cheese,
        sauce: formValues.sauce,
        olives: formValues.olives,
        meat: formValues.meat,
      },
      specialInstructions: formValues.specialInstructions.trim(),
    };

    postNewPizza(newData);
    console.log(savedFormInfo);
  };

  return (
    <>
      <h1>Lambda Eats</h1>
      <Router>
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pizza">Make Your Own Pizza</Link>
          </li>
        </nav>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/pizza">
              <Form formValues={formValues} change={change} submit={submit}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
export default App;
