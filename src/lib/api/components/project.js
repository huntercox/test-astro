export async function getProjectData(uri) {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query getProjectContentByUri($uri: String!) {
				projectBy(uri: $uri) {
					title
					uri
					content(format: RENDERED)
					projectSkills {
						skills {
							... on Skill {
								id
								title
							}
						}
					}
					projectView {
						projectLink
						explain
					}
					projectEmployer {
						employer {
							... on Employer {
								id
								title
							}
						}
					}
					projectDate {
						projectDate
					}
					projectContributions {
						contributions {
							description
						}
					}
					terms {
						nodes {
							name
						}
					}
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