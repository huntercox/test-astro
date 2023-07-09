export async function getSkills() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
				skills {
					nodes {
						title
					}
				}
			}`
		})
	});
	const { data } = await response.json();
	return data;
}