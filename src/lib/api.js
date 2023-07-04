export async function getSiteInfo() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
						generalSettings {
								title
								description
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
	// console.log(data);
	return data;
}

export async function getPrimaryNavMenu() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
							menus(where: {location: PRIMARY}) {
								nodes {
									name
									menuItems {
											nodes {
													uri
													url
													order
													label
											}
									}
								}
							}
					}
					`
		})
	});
	const { data } = await response.json();
	return data;
}


export async function getNodeByURI(uri) {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query GetNodeByURI($uri: String!) {
							nodeByUri(uri: $uri) {
								__typename
								isContentNode
								isTermNode
								... on Post {
									id
									title
									date
									uri
									excerpt
									content
									categories {
										nodes {
											name
											uri
										}
									}
									featuredImage {
										node {
											mediaItemUrl
											altText
										}
									}
								}
								... on Page {
									id
									title
									uri
									date
									content
								}
								... on Category {
									id
									name
									posts {
										nodes {
											date
											title
											excerpt
											uri
											categories {
												nodes {
													name
													uri
												}
											}
											featuredImage {
												node {
													altText
													mediaItemUrl
												}
											}
										}
									}
								}
							}
						}
					`,
			variables: {
				uri: uri
			}
		})
	});
	const { data } = await response.json();
	return data;
}


export async function getAllUris() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query GetAllUris {
            posts(first: 100) {
              nodes {
                uri
              }
            }
            pages(first: 100) {
              nodes {
                uri
              }
            }
						terms {
              nodes {
                uri
              }
            }
          }
          `
		})
	});
	const { data } = await response.json();
	const uris = Object.values(data)
		.reduce(function (acc, currentValue) {
			return acc.concat(currentValue.nodes)
		}, [])
		.map(node => {
			if (node.uri) {  // This is where you add the check

				let trimmedURI = node.uri.substring(1);
				trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1)
				return {
					params: {
						uri: trimmedURI
					}
				}
			}
		})
		.filter(Boolean);

	return uris;

}
