import RecycledItemForm from "./RecycledItemForm";
import { useState } from 'react';

function RecycledItems({deleteThatItem, edit, item}) {
    const [edditToggle, setEditToggle] = useState(false); 

    function deleteAndRefresh(id){
        deleteThatItem(item.id);
        window.location.reload(false);
    };
    
    return (
        <div className = 'item'>
            { !edditToggle ?

                <>
                    <h1>Name: <span className = 'not-bold'>{item.name}</span></h1>
                    <span className = 'make-bold'> | </span>
                    <span className = 'make-bold'>Desc:</span>{item.details}
                    <span className = 'make-bold'> | </span>
                    <br></br>
                    <button 
                        onClick = {() => deleteAndRefresh(item.id)} 
                        className = 'delete'>
                        Delete
                    </button>

                    <button 
                        onClick = {() => setEditToggle((prevToggle) => !prevToggle)}
                        className = 'edit'>
                        Edit
                    </button>

                </>

                :
                <>
                    <RecycledItemForm 
                        name = {item.name}
                        details = {item.details}
                        id = {item.id}
                        btnText = 'Submit Edit'
                        add = {edit}/>
                        <button
                            onClick = {() => setEditToggle((prevToggle) => !prevToggle)}
                            className = 'close-btn'>
                            Confirm
                        </button>
                </>
            }
        </div>
    );
}

export default RecycledItems;
