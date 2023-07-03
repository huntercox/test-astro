export async function getSiteInfo() {
	const getSiteInfoRes = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
						generalSettings {
								title
								url
								description
						}
				}
				`
		})
	});
	const { data } = await getSiteInfoRes.json();
	return data;
}