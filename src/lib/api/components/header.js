export async function getHeaderData() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
				menuItems(where: {location: MENU_1}) {
					nodes {
						label
						uri
					}
				},
				generalSettings {
					title
					description
				}
			}`
		})
	});
	const { data } = await response.json();
	return data;
}