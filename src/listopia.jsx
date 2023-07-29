import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMoon, FaPlus, FaMinus } from "react-icons/fa";
import Cookies from 'js-cookie';
import "./myform.css";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { motion } from "framer-motion";





function FadeInWhenVisible({ children }) {
	return (
	  <motion.div
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true }}
		transition={{ duration: 2 }}
		variants={{
		  visible: { opacity: 1, scale: 1 },
		  hidden: { opacity: 0, scale: 1 }
		}}
	  >
		{children}
	  </motion.div>
	);
  }


  const Listopia = () => {
    const [taskName, setTaskName] = useState("");
    const [savedToDoLists, setSavedToDoList] = useState([]);
    const [savedList, setToDoList] = useState([]);
    let currentToDoList = "";
    const handleListSelect = (list) => {
      const selectedTasks = list.items.filter((task) => task.selected);
      const unselectedTasks = list.items.filter((task) => !task.selected);
      const combinedList = [...unselectedTasks, ...selectedTasks];

      setToDoList(combinedList);
      currentToDoList = list.name;
    };
  
    useEffect(() => {
      const savedLists = localStorage.getItem("savedToDoLists");
      if (savedLists) {
        setSavedToDoList(JSON.parse(savedLists));
      }
    }, []);

    const handleClearClick = (date) => {
      setToDoList([]);
    };
  
    const handleTaskAdd = () => {
      if (taskName.trim() !== "") {
        setToDoList([...savedList, { name: taskName }]);
        setTaskName("");
      }
    };
  
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleTaskAdd();
      }
    };

    const [listName, setListName] = useState("");

    const handleSaveClick = () => {
      console.log("Saved");
      if (listName.trim() === "") {
        alert("Please enter a name for the list.");
        return;
      }
    
      if (savedList.length === 0) {
        alert("Your list is empty. Add some tasks before saving.");
        return;
      }
    
      const newSavedList = {
        name: listName.trim(),
        items: savedList,
      };
    
      // Get the existing saved lists from localStorage
      const existingSavedLists = localStorage.getItem("savedToDoLists");
      let updatedSavedLists = [];
    
      if (existingSavedLists) {
        updatedSavedLists = JSON.parse(existingSavedLists);
      }
    
      updatedSavedLists.push(newSavedList);
    
      // Save the updated list of lists in localStorage
      localStorage.setItem("savedToDoLists", JSON.stringify(updatedSavedLists));
    
      setListName("");
      console.log(savedToDoLists.length);
      alert("List saved.");
      window.location.reload();
    };

  const handleNukeClick = () => {
    localStorage.removeItem("savedToDoLists");
    setToDoList([]);
    setSavedToDoList([]);
  }

    const handleTaskToggle = (index) => {
      const updatedList = [...savedList];
      updatedList[index].selected = !updatedList[index].selected;
      const selectedTasks = updatedList.filter((task) => task.selected);
      const unselectedTasks = updatedList.filter((task) => !task.selected);
      const combinedList = [...unselectedTasks, ...selectedTasks];
    
      setToDoList(combinedList);
      const updatedToDoLists = savedToDoLists.map((todoList) => {
        if (todoList.name === currentToDoList) {
          return {
            ...todoList,
            items: combinedList
          };
        }
        return todoList;
      });
      setSavedToDoList(updatedToDoLists);
      localStorage.setItem("savedToDoLists", JSON.stringify(updatedToDoLists));

    };
    
    return (
      <div className={`container`}>
      <FadeInWhenVisible><div className="gheader"> Listopia </div></FadeInWhenVisible>
      
        {(savedList!=null && savedList.length>0) && (
          <FadeInWhenVisible>
            <div className="listcontainer">
            {savedList.map((task, index) => (
              <div key={index} className="task-item">
                <div className="task-circle" onClick={() => handleTaskToggle(index)}>
                  {task.selected && <div className="selected-circle"></div>}
                </div>
                <FadeInWhenVisible>{task.name}</FadeInWhenVisible>
              </div>
            ))}
            </div>
          </FadeInWhenVisible>
        )}
        
        <div className="fieldcontainer">
          <div className="taskadd">
            <input
              className="taskfield tinput"
              type="text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div onDoubleClick={handleClearClick} className="sbutton" title="Double click to delete list">
              Clear
            </div>
          </div>
        </div>

        <div className="listsave">
          <input
            className="listname tinput"
            type="text"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <div onClick={handleSaveClick} className="sbutton" title="Double click to save list">
            Save List
          </div>
        </div>

        {(savedToDoLists.length>0) && (
          <div className="all-lists">
            <table className="list-table">
              <thead>
                <tr>
                  <th>Your Lists</th>
                </tr>
              </thead>
              <tbody>
                {savedToDoLists.map((list, index) => (
                  <tr
                    key={index}
                    className={savedList === list ? "list selected" : "list"}
                    onClick={() => handleListSelect(list)}
                  >
                    <td>{list.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div onDoubleClick={handleNukeClick} className="sbutton" title="Double click to delete all lists">
              Delete Lists
            </div>
          </div>)}

      </div>
    );
  };
  
  export default Listopia;