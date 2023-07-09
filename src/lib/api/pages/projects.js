export async function getProjects() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
				projects {
					nodes {
						title
						slug
					}
				}
			}`
		})
	});
	const { data } = await response.json();
	return data;
}