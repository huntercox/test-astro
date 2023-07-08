import { Octokit, App } from "octokit";

export async function getRepos() {
	const octokit = new Octokit({
		auth: import.meta.env.GH_TOKEN
	});


	let isLoggedIn = false;
	await octokit.rest.users.getAuthenticated().then(response => {
		// if (response.data.login === 'huntercox') {
		// isLoggedIn = true;
		isLoggedIn = !!response?.data?.login && response?.data?.login.length > 0
	}).catch(error => {
		isLoggedIn = false;
	});

	// const repos = [];
	const data = await octokit.request('GET /user/repos', {
		visibility: 'public',
		sort: 'pushed',
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

	// console.log(data)

	const repos = data?.data?.map(item => {
		return {
			name: item.full_name,
			url: item.html_url
		}
	})

	return repos;
}


export async function getProfileLink() {
	const octokit = new Octokit({
		auth: import.meta.env.GH_TOKEN
	});


	let isLoggedIn = false;
	await octokit.rest.users.getAuthenticated().then(response => {
		// if (response.data.login === 'huntercox') {
		// isLoggedIn = true;
		isLoggedIn = !!response?.data?.login && response?.data?.login.length > 0
	}).catch(error => {
		isLoggedIn = false;
	});

	const data = await octokit.request('GET /user', {
		type: 'public',
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

	const profileInfo = data?.data?.html_url;
	return profileInfo;
}