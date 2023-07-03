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
	// console.log('Response: ' + data);
	// console.log(data);
	return data;
}