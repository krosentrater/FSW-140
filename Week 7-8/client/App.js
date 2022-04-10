import { useState, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import RecycledItems from './RecycledItems';
import RecycledItemForm from './RecycledItemForm';

function App() {

  const [items, setItems] = useState([]);

  //Works as expected!
  const getRecycledItems = () => {
    axios.get('http://localhost:5000/recycled-items')
    .then((res) => {
      setItems(res.data)
    })
    .catch((err) => console.warn(err))
  };

  //! partially works does not take input but will add new item (now works with window refresh)
  //? Works now with the manual refresh in page. Not the proper way but the only way I could figure out how to force a re render.
  const postItems = (name, details) => {
    console.log(name)
    console.log(details)
    axios.post('http://localhost:5000/recycled-items/addItem', {name, details})
      .then((res) => {
        setItems(prevItems => [...prevItems, res.data])
      })
      .catch((err) => console.warn(err))
  };

  //! Works but need to re render page for removal (added window refresh)
   //? Works now with the manual refresh in page. Not the proper way but the only way I could figure out how to force a re render.
  const deleteItem = (itemId) => {
    axios.delete(`http://localhost:5000/recycled-items/delItem/${itemId}`)
      .then((res) => {
        setItems(prevItems => prevItems.filter(item => item._id !== itemId))
      })
      .catch((err) => console.warn(err))
  };

  //! Works with post man, but getting wrong values...
  //? Attempted but kept getting wrong values in the wrong spots in the query! Didn't have enough time to really work through this one although it would have been satisfying to figure out!
  const editItem = (updates, itemId) => {
    console.log(updates)
    console.log(itemId)
    axios.put(`http://localhost:5000/recycled-items/updateitem/${itemId}`, updates)
      .then((res) => {
        setItems((prevItems) => prevItems.map((item) => item.id !== itemId ? item : res.data))
      })
      .catch((err) => console.warn(err))
  };
  
  useEffect( () => {
    getRecycledItems();
  }, []); 

  const recycled = items.map((stuff) => 
  <RecycledItems 
    deleteThatItem = {deleteItem} 
    edit = {editItem}
    item = {stuff} 
    key = {stuff.id} />);
  
  return (
    <>
      <h1 className = 'header'>Thunberg's Recycling Corp &trade;</h1>
      <h4 className = 'sub-header'>NYC recycles even more</h4>
      <div className = 'recycled-items'>
        <RecycledItemForm add = {postItems} btnText = 'Add Item'/>
        {recycled}
      </div>
    </>
  );
}

export default App;
