import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food'

const getRandomCoordinates = () => {
	let min = 2;
	let max = 97;
	let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
	let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
	return [x,y]
  }

  const initialState = {
	food : getRandomCoordinates(),
		direction : 'RIGHT',
		speed : 150,
		snakeDots: [
			[0,0],
			[2,0],
			[4,0]
		]
}

function Navbar() {
	const [navbarOpen, setNavbarOpen] = React.useState(false);
	return (
	  <>
		<nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
		  <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
			<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
			  <a
				className="text-4xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-purple-600"
			  >
				Snake Game
			  </a>
			</div>
			<div>
			  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
				<li className="nav-item">
				  <a
					className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-purple-600 hover:text-white"
					href="https://github.com/Piamias"
				  >
					  Code Sources
				  </a>
				</li>
				<li className="nav-item">
				  <a
					className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-purple-600 hover:text-white"
					href="#info"
				  >
					Info
				  </a>
				</li>
				<li className="nav-item">
				  <a
					className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-purple-600 hover:text-white"
					href="#Contact"
				  >
					Contact
				  </a>
				</li>
			  </ul>
			</div>
		  </div>
		</nav>
	  </>
	);
  }

class App extends Component {

	state = {

		dark : true,
		food : getRandomCoordinates(),
		direction : 'RIGHT',
		speed : 100,
		snakeDots: [
			[0,0],
			[2,0],
			[4,0]
		]
	}

	onkeydown = (e) => {

		e = e || window.event;
    		switch (e.keyCode) {
      		case 38:
        		this.setState({direction: 'UP'});
        		break;
      		case 40:
        		this.setState({direction: 'DOWN'});
        		break;
      		case 37:
        		this.setState({direction: 'LEFT'});
        		break;
      		case 39:
        		this.setState({direction: 'RIGHT'});
        		break;
    		}
	}

	handleClick = () => {
		this.setState(initialState)
	}

	moveSnake = () => {
		let dots = [...this.state.snakeDots];
		let head = dots[dots.length - 1];
		switch (this.state.direction) {
			case 'RIGHT':
				head = [head[0] + 2, head[1]];
				break;
			case 'LEFT':
				head = [head[0] - 2, head[1]];
				break;
			case 'DOWN':
				head = [head[0], head[1] + 2];
				break;
			case 'UP':
				head = [head[0], head[1] - 2];
				break;
		  }
		dots.push(head);
		dots.shift();
		this.setState({
			snakeDots: dots
		  })
	}

	checkIfOutOfBorders() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    	if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      		this.onGameOver();
    	}
	}

	checkIfCollapsed() {
		let snake = [...this.state.snakeDots];
		let head = snake[snake.length - 1];
		snake.pop();
		snake.forEach(dot => {
		  if (head[0] == dot[0] && head[1] == dot[1]) {
			this.onGameOver();
		  }
		})
	  }

	checkIfEat() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
		let food = this.state.food;
		if (head[0] == food[0] && head[1] == food[1]) {
		  this.setState({
			food: getRandomCoordinates()
		  })
		  this.enlargeSnake();
		  this.increaseSpeed();
		}
	  }

	  enlargeSnake() {
		let newSnake = [...this.state.snakeDots];
		newSnake.unshift([])
		this.setState({
		  snakeDots: newSnake
		})
	  }
	
	  increaseSpeed() {
		if (this.state.speed > 10) {
		  this.setState({
			speed: this.state.speed - 10
		  })
		}
	  }

	onGameOver() {
		alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
		this.setState(initialState)
	}

	componentDidMount() {
		setInterval(this.moveSnake, this.state.speed)
		document.onkeydown = this.onkeydown;
	}

	componentDidUpdate() {
		this.checkIfOutOfBorders()
		this.checkIfCollapsed()
		this.checkIfEat()
	}

	render() {
		return (
		<>
		<title>SkyPong</title>
		<div className='flex flex-col h-screen my-auto bg-cover bg-gradient-to-b from-neutral-900 to-neutral-900 "'>
			<Navbar/>
		  	<div className="game-area">
			<Snake snakeDots={this.state.snakeDots}/>
			<Food dot={this.state.food}/>
			</div>
			<div className="flex items-center justify-center">
			<div className="">
			<div className="flex p-2 w-full justify-center space-x-10"></div>
			<div class="flex w-full justify-center space-x-0">
    			<button class="min-w-auto w-32 h-10 bg-purple-600 p-2 rounded-l-full hover:bg-white text-white hover:text-purple-600 font-semibold  hover:flex-grow transition-all duration-200 ease-in-out">
      				Leaderboard
    			</button>
    			<button class="min-w-auto w-32 h-10 bg-purple-600 p-2 rounded-none hover:bg-white text-white hover:text-purple-600 font-semibold  hover:flex-grow transition-all duration-200 ease-in-out">
      				Play
    			</button>
    			<button class="min-w-auto w-32 h-10 bg-purple-600 p-2 rounded-r-full hover:bg-white text-white hover:text-purple-600 font-semibold hover:flex-grow transition-all duration-200 ease-in-out">
      				Friend List
    			</button>
 			</div>
			<div className="flex h-28 items-center justify-center">
				<button 
					className="min-w-auto w-14 h-14 bg-purple-600 p-2 rounded-full hover:bg-white text-white hover:text-purple-600 font-semibold transition-rotation duration-300 hover:rotate-90 ease-in-out"
					onClick={this.handleClick}
				>
      				Reset
				</button>
			</div>
			</div>
			</div>
			</div>
		</>
		);
	  }
}

export default App;
