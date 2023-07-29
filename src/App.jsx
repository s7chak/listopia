import Listopia from "./listopia";
import React, { createContext, useState } from "react";
import "./myform.css";

export const ThemeContext = createContext(null);

export const App = () => {
	const [theme, setTheme] = useState("dark");
	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"));
	}
	return (
		<div className="app" id={theme}>
      		<Listopia changeTheme={toggleTheme} />
    	</div>
	);
};


export default App;