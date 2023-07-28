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


  const ToDoism = () => {
    const [taskName, setTaskName] = useState("");
    const [savedToDoList, setSavedToDoList] = useState([]);
  
    useEffect(() => {
      const savedListFromCookies = Cookies.get("savedToDoList");
      if (savedListFromCookies) {
        setSavedToDoList(JSON.parse(savedListFromCookies));
      }
    }, []);
  
    useEffect(() => {
      Cookies.set("savedToDoList", JSON.stringify(savedToDoList));
    }, [savedToDoList]);

    const handleClearClick = (date) => {
      setSavedToDoList([]);
      Cookies.remove('savedToDoList');
    };
  
    const handleTaskAdd = () => {
      if (taskName.trim() !== "") {
        setSavedToDoList([...savedToDoList, { name: taskName }]);
        setTaskName("");
      }
    };
  
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleTaskAdd();
      }
    };

    const handleTaskToggle = (index) => {
      const updatedList = [...savedToDoList];
      updatedList[index].selected = !updatedList[index].selected;
    
      const selectedTasks = updatedList.filter((task) => task.selected);
      const unselectedTasks = updatedList.filter((task) => !task.selected);
    
      const combinedList = [...selectedTasks, ...unselectedTasks.reverse()];
    
      setSavedToDoList(combinedList);
    };
    
    return (
      <div className={`container`}>
      <FadeInWhenVisible><h2> ToDoisms </h2></FadeInWhenVisible>
        {(savedToDoList.length>0) && (
          <FadeInWhenVisible>
            <div className="listcontainer">
              {savedToDoList
              .slice(0)
              .reverse()
              .map((task, index) => (
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
          <input
            className="taskfield"
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div onDoubleClick={handleClearClick} className="sbutton" title="Double click to delete list">
            Clear
          </div>
        </div>
      </div>
    );
  };
  
  export default ToDoism;