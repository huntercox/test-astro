export async function getSkillData(uri) {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query getSkillContentByUri ($uri: String!) {
				skillBy(uri: $uri) {
					title
					uri
					content(format: RENDERED)
				}
			}`,
			variables: {
				uri: uri
			}
		})
	});
	const { data } = await response.json();
	// console.log(data);
	return data;
}