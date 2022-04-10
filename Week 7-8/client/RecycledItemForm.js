import { useState } from 'react';


function RecycledItemForm({ add, name, details, btnText, id }) {

    const initialInput = {name: name || '', details: details || ''};
    const [inputs, setInputs] = useState(initialInput);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const handleSubmit = (e) => {   
        e.preventDefault();
        add(inputs.name, inputs.details);
        setInputs(initialInput);
        window.location.reload(false);
    };

    return (
        <form onSubmit = {handleSubmit}>
            <input 
                type = 'text'
                name = 'name'
                value = {inputs.name}
                onChange = {handleChange}
                placeholder = 'Name' />
            <input 
                type = 'text'
                name = 'details'
                value = {inputs.details}
                onChange = {handleChange}
                placeholder = 'Details' />
                <button className = 'add'>{btnText}</button>
        </form>
    );
}

export default RecycledItemForm;