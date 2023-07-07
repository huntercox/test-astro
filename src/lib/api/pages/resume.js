export async function getEmployers() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
				employers {
					nodes {
						title
						content
					}
				}
			}`
		})
	});
	// const res = await response.json();
	// console.log(res.data.employers);
	const { data } = await response.json();
	return data;
}