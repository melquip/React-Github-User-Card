import React from 'react';
import { axiosAuth, persistData, getData } from './helpers';
import GitHubCalendar from 'github-calendar';

export default class Card extends React.Component {
	constructor(props) {
		super(props);
		const data = getData(`github_user_card_${props.login}`);
		this.state = data ? data : { user: null };
		this.calendar = false;
	}
	requestUser = () => {
		const { login } = this.props;
		if (login && !this.state.user) {
			console.log(login, !this.state.user)
			axiosAuth().get(`https://api.github.com/users/${login}`)
				.then(response => {
					const state = {
						user: response.data
					};
					this.setState(state);
					persistData(`github_user_card_${state.user.login}`, state)
				})
				.catch(error => console.error(error));
		} else console.info(login, !this.state.user);
		if (this.state.user && !this.calendar) {
			GitHubCalendar(`.card[data-id="${this.state.user.login}"] .calendar`, login, { responsive: true });
			this.calendar = true;
		}
	}
	componentDidMount() {
		this.requestUser();
	}
	componentDidUpdate() {
		this.requestUser();
	}
	toggleChart = (e) => {
		e.target.parentElement.classList.toggle('showMore');
	}
	render() {
		if (this.state.user !== null) {
			const { avatar_url, login, name, location, html_url, followers, following, bio } = this.state.user;
			return (<div className="card" data-id={login}>
				<img src={avatar_url} alt={name} />
				<div className="card-info">
					<h3 className="name">{name}</h3>
					<p className="username">{login}</p>
					<p>Location: {location}</p>
					<p>Profile:
						<a href={html_url}>{html_url}</a>
					</p>
					<p>Followers: {followers}</p>
					<p>Following: {following}</p>
					<p>Bio: {bio}</p>
				</div>
				<div className="calendar"></div>
				<button onClick={this.toggleChart}>Show more</button>
			</div>);
		} else {
			return (<div className="card">
				<div className="card-info">
					<h3 className="name">Loading...</h3>
				</div>
			</div>);
		}
	}
}