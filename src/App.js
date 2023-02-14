
import React from 'react';
import './App.scss';
import TodoList from "./components/TodoList";
import useThemeStore from 'utils/useThemeStore';
import Modal from 'components/Modal';
import { useModalStore } from 'utils/useDataStore';

function App() {
	const darkMode = useThemeStore((state) => state.darkMode)
	const modalOpen = useModalStore((state) => state.modalOpen)

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
				<TodoList />
			</main>
			
			{
				modalOpen &&
				<Modal />
			}
			<footer>
				<div class="attr">
					Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel='noreferrer'>Frontend Mentor</a>. 
					Coded by <a href="github.com/beatrs">beatrs</a>.
				</div>
			</footer>
    </div>
  );
}

export default App;
