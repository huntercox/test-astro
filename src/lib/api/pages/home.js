export async function getHomePageContent() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
				pageBy(pageId: 7) {
					content
				}
			}`
		})
	});
	const { data } = await response.json();
	return data;
}