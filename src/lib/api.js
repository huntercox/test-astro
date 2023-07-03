export async function getSiteInfo() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
						generalSettings {
								title
						}
				}
				`
		})
	});
	const { data } = await response.json();
	// console.log(data);
	return data;
}

// Protected API route
export async function getDraftPosts() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
					pages(where: {status: DRAFT}) {
						nodes {
							title
						}
					}
				}
				`
		})
	});
	const { data } = await response.json();
	console.log(data);
	return data;
}
