import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import '../containers/App.css';
import ErrorBoundary from '../components/ErrorBoundary'

const state = {
	robots: [],
	searchfield: ''
}

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({ robots: users}))
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});

	}

	render(){
			const filteredRobots = this.state.robots.filter( robot => {
				return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
				})
			return (
			<div className='tc'>
				<h1 className='f2'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		)
	}
}

export default App;