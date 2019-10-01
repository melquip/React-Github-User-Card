import React from 'react';
import Card from './Card';
import { axiosAuth, persistData, getData } from './helpers';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: 'melquip',
			followers: getData('github_card_followers').followers || []
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
		} else console.log(this.state.followers)
	}

	render() {
		const { username, followers } = this.state;
		return (
			<div className="App">
				<Card username={username} />
				{
					followers.map(follower => <Card username={follower.login} key={follower.id} />)
				}
			</div>
		);
	}
}