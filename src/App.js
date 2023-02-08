
import React from 'react';
import './App.scss';
import TodoList from "./components/TodoList";
import useThemeStore from 'utils/useThemeStore';
import { DataList } from 'utils/AppContext';

function App() {
	const darkMode = useThemeStore((state) => state.darkMode)

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
			<header>
				{/* {
					darkMode ? 
					<img src={require("assets/images/bg-desktop-dark.jpg")} alt="" />
					:
					<img src={require("assets/images/bg-desktop-light.jpg")} alt="" />
				} */}
				
			</header>
			<main>
				<DataList>
					<TodoList />
				</DataList>
				
			</main>
    </div>
  );
}

export default App;
