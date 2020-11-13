import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Form from "./Form";
import Home from "./Home";
import axios from "axios";
import formSchema from "./formSchema";
import * as yup from "yup";

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
  const [ formErrors, setFormErrors ] = useState(initialFormErrors);

  const postNewPizza = () => {
    axios
      .post("https://reqres.in/api/users", savedFormInfo)
      .then((res) => {
        setFormValues(defaultValues)
        
      })
      .catch(err => {
        console.log(err);
        debugger;
      })
  }

  const change = (evt) => {
    const { name, value, type, checked } = evt.target;

    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: ""})
      })
      .catch((err) => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
    
    const updatedValue = type === "checkbox" ? checked : value;
    setFormValues({ ...formValues, [name]: updatedValue });
    console.log(formValues);
  };

  const submit = (evt) => {
    evt.preventDefault();
    
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
    
    setSavedFormInfo([...savedFormInfo, newData]);
    console.log(savedFormInfo);
    postNewPizza();
    
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
            <Link to="/pizza" className="makePizza">Make Your Own Pizza</Link>
          </li>
        </nav>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/pizza">
              <Form formValues={formValues} change={change} submit={submit} errors={formErrors}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
export default App;
