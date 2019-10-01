import React from 'react';
import Card from './Card';
import { axiosAuth, persistData, getData } from './helpers';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		const data = getData('github_card_followers');
		this.state = {
			username: 'melquip',
			search: '',
			searched: '',
			followers: data ? data.followers : []
		};
	}

	componentDidMount() {
		if (this.state.followers.length === 0) {
			axiosAuth().get('https://api.github.com/users/melquip/followers')
				.then(response => {
					const state = {
						followers: response.data
					}
					this.setState(state);
					persistData('github_card_followers', state);
				})
				.catch(error => console.error(error));
		} else {
			console.log('data came from state')
		}
	}

	searchOnChange = (e) => {
		const search = e.target.value;
		this.setState(currentState => ({
			search: search
		}));
	}

	requestGithubUser = (e) => {
		e.preventDefault();
		this.setState(currentState => ({
			search: '',
			searched: currentState.search
		}));
	}

	render() {
		const { username, followers, search, searched } = this.state;
		console.log('search', search, 'searched', searched);
		return (
			<div className="App">
				<h2>Search by github user handle</h2>
				<form onSubmit={this.requestGithubUser}>
					<label htmlFor="search">Search user</label>
					<input id="search" name="search" type="text" value={search} onChange={this.searchOnChange} />
					<button type="submit">Search</button>
				</form>
				{
					searched.length > 0 ? <Card login={searched} /> : null
				}
				<h2>Me and my followers</h2>
				<Card login={username} />
				{
					followers.map(follower => <Card login={follower.login} key={follower.id} />)
				}
			</div>
		);
	}
}