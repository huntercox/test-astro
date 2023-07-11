export async function getProjects() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query getProjects {
				projects(first: 30) {
					nodes {
						title
						slug
						terms {
							nodes {
								name
							}
						}
						projectDate {
							projectDate
						}
					}
				}
				terms(where: {taxonomies: CATEGORY}) {
					edges {
						node {
							name
						}
					}
				}
			}`
		})
	});
	const { data } = await response.json();
	return data;
}
