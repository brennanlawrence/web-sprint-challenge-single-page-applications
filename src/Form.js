import React from "react";

export default function Form(props) {
    const { formValues, change, submit } = props;
    
    return (
        <div>
            <form onSubmit={submit}>
                <h3>Make Your Own Pizza</h3>
                <label>
                    Name
                    <input type="text" name="name" value={formValues.name} onChange={change}/>
                </label>
                <div>
                    <label>
                        Size
                        <select name="size" value={formValues.size} onChange={change}>
                            <option value="">--Choose Size--</option>
                            <option value="10 inch">10 inch</option>
                            <option value="12 inch">12 inch</option>
                            <option value="16 inch">16 inch</option>
                        </select>    
                    </label>
                </div>
                <div>
                    <h3>Toppings</h3>   
                    <label>
                        Cheese
                        <input type="checkbox" name="cheese" onChange={change} checked={formValues.cheese}/>
                    </label>
                    <label>
                        Sauce
                        <input type="checkbox" name="sauce" onChange={change}/>
                    </label>
                    <label>
                        Olives
                        <input type="checkbox" name="olives" onChange={change}/>
                    </label>
                    <label>
                        Meat
                        <input type="checkbox" name="meat" onChange={change}/>
                    </label>
                </div>
                <h3>Special Instructions</h3>
                <label>
                    Instructions
                    <input type="text" name="specialInstructions" value={formValues.specialInstructions} onChange={change}/>
                </label>
                <button >Order</button>
            </form>
        </div>
    );
};