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
						employmentDetails {
							jobTitle
							location
							status {
								currentEmployer
								startDate {
									month
									year
								}
								lengthOfEmployment {
									months
									years
								}
								endDate {
									month
									year
								}
							}
						}
					}
				}
			}`
		})
	});
	const { data } = await response.json();
	return data;
}