/**
 * Get Site Info
 *
 *  - Site Name
 *  - Site Description
 *
 * @return data ... should be in the form of:
 *	"data": {
 *	  "generalSettings": {
 *	    "title": "huntercox.dev",
 *	    "description": "SITE DESCRIPTION"
 *	  }
 *	}
 * */
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


/**
 * Get Navigation Menu from WordPress
 *
 * @param {string} location - The location of the menu to retrieve
 * 	- either "MENU_1" or "PRIMARY"
 *
 * @returns data ... should be in the form of:
 *
 * "data": {
 *  "menuItems": {
 *    "nodes": [
 *      {
 *        "label": "Resume",
 *        "uri": "/resume/"
 *      },
 *      {
 *        "label": "Skills",
 *        "uri": "/skills/"
 *      },
 *      {
 *        "label": "Projects",
 *        "uri": "/projects/"
 *      }
 *    ]
 *  }
 *}
 *
 */
export async function getNavMenu() {
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
				}
			}`
		})
	});
	const { data } = await response.json();
	return data;
}




export async function getPageContentByUri(uri) {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query getPageContentByUri ($uri: String!) {
				pageBy(uri: $uri) {
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