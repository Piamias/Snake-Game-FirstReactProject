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
		speed : 160,
		play : false,
		score : 0,
		i : 1,
		intervalId : -1,
		snakeDots: [
			[0,0],
			[2,0],
			[4,0]
		]
}

function Background() {
	return (
		<div className='ripple-background'>
  		<div className='circle xxlarge shade1'></div>
  		<div className='circle xlarge shade2'></div>
  		<div className='circle large shade3'></div>
  		<div className='circle mediun shade4'></div>
  		<div className='circle small shade5'></div>
		</div>
	)
}

function Navbar() {
	return (
	  <>
		<nav className="bg-yellow-600 relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
		  <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
			<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
			  <a
				className="text-4xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
				href='#Home'
			  >
				Snake Game
			  </a>
			</div>
			<img className="h-20 w-20 self-center" src="https://images.emojiterra.com/google/android-11/512px/1f40d.png" alt=""/>
			<div>
			  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
				<li className="nav-item">
				  <a
					className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-opacity-75"
					href="https://github.com/Piamias"
				  >
					  Code Sources
				  </a>
				</li>
				<li className="nav-item">
				  <a
					className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-opacity-75"
					href="#Info"
				  >
					Info
				  </a>
				</li>
				<li className="nav-item">
				  <a
					className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-opacity-75"
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

  function Waiting() {
	return (
		<>
		<div className=" flex space-x-12 p-12 justify-center items-center">
		<div className="h-48 flex items-center justify-center space-x-2 animate-pulse">
		<div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
		<div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
		<div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
		</div>
		</div>
		</>
		)
  }

class App extends Component {

	state = {

		dark : true,
		food : getRandomCoordinates(),
		direction : 'RIGHT',
		speed : 200,
		play : false,
		score : 0,
		i : 1,
		intervalId : -1,
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
			default:
					break;
    		}
	}

	handleClick = () => {
		if (!this.state.play) {

			this.setState({
				play : true,
				i : 1
			})
		}
		else 
			this.setState({play : false})
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
			default:
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
		  if (head[0] === dot[0] && head[1] === dot[1]) {
			this.onGameOver();
		  }
		})
	  }

	checkIfEat() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
		let food = this.state.food;
		if (head[0] === food[0] && head[1] === food[1]) {
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
		if (this.state.speed > 20) {
		  this.setState({
			speed: this.state.speed - 20
		  })
		  clearInterval(this.state.intervalId)
		  this.setState({intervalId : setInterval(this.moveSnake, this.state.speed)})
		}
	  }

	onGameOver() {
		alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
		clearInterval(this.state.intervalId)
		this.setState(initialState)
		this.setState({score : this.state.snakeDots.length})
	}

	componentDidUpdate() {
		
		if (this.state.play && this.state.i === 1)	{
			this.setState({intervalId : setInterval(this.moveSnake, this.state.speed)})
			document.onkeydown = this.onkeydown;
			this.setState({i : 0})
		}
		if (!this.state.play)
			clearInterval(this.state.intervalId)
		this.checkIfOutOfBorders()
		this.checkIfCollapsed()
		this.checkIfEat()
	}

	render() {
		return (
		<>
		<title>SnakeGame</title>
		<div className='flex flex-col h-screen my-auto bg-cover bg-gradient-to-b from-neutral-200 to-neutral-200 "'>
			<Navbar/>
			{/* <div className=" flex flex-col justify-center items-center">
    			<b className="font-bold text-purple-600 animate-ping">{this.state.speed === 20 && 'SPEED MAX!'}</b> */}
		  	<div className="game-area">
			<Snake snakeDots={this.state.snakeDots}/>
			<div>{!this.state.play && this.state.i === 0 ? <Waiting/> : ''}</div>
			<Food dot={this.state.food}/>
			</div>
			<Background/>
			<div className="flex items-center justify-center">
			<div className="">
			<div className="flex p-2 w-full justify-center space-x-10"></div>
			<div className="flex w-full justify-center space-x-0">
    			<button className="min-w-auto w-32 h-10 bg-yellow-600 p-2 rounded-l-full hover:bg-white text-white hover:text-yellow-600 font-semibold  hover:flex-grow transition-all duration-200 ease-in-out">
      				Leaderboard
    			</button>
    			<button 
					className="min-w-auto w-32 h-10 bg-yellow-600 p-2 rounded-none hover:bg-white text-white hover:text-yellow-600 font-semibold  hover:flex-grow transition-all duration-200 ease-in-out"
					onClick={this.handleClick}
					>
					<b>{this.state.play ? 'Pause' : 'Play'}</b>
    			</button>
    			<button className="min-w-auto w-32 h-10 bg-yellow-600 p-2 rounded-r-full hover:bg-white text-white hover:text-yellow-600 font-semibold hover:flex-grow transition-all duration-200 ease-in-out">
      				Friend List
    			</button>
 			</div>
			 <div className="flex items-center justify-center h-24 text-yellow-600 p-2 rounded-l-full font-semibold tracking-widest">
				  MaxScore : {this.state.score}
			</div>
			</div>
			</div>
			</div>
			{/* </div> */}
		</>
		);
	  }
}

export default App;
