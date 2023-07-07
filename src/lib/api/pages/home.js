export async function getHomePageContent() {
	const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
				pageBy(pageId: 7) {
					flexLayouts {
						flexLayouts {
							... on ContentNode_Flexlayouts_FlexLayouts_BasicContent {
								fieldGroupName
								textContent
								settings {
									fieldGroupName
									colorSettings {
										backgroundColor
										fieldGroupName
										textColor
									}
									layoutSettings {
										container
										fieldGroupName
									}
									spacingSettings {
										fieldGroupName
										margin {
											bottom
											top
											right
											left
											fieldGroupName
										}
										padding {
											bottom
											fieldGroupName
											left
											right
											top
										}
									}
								}
							}
							... on ContentNode_Flexlayouts_FlexLayouts_AdvancedContent {
								fieldGroupName
								visualEditor
								settings {
									fieldGroupName
									layoutSettings {
										container
										fieldGroupName
									}
									spacingSettings {
										fieldGroupName
										margin {
											bottom
											fieldGroupName
											left
											right
											top
										}
										padding {
											bottom
											fieldGroupName
											left
											right
											top
										}
									}
								}
							}
							... on ContentNode_Flexlayouts_FlexLayouts_Columns {
								fieldGroupName
								columnLayouts {
									... on ContentNode_Flexlayouts_FlexLayouts_Columns_ColumnLayouts_2Columns {
										column1Content
										column2Content
										fieldGroupName
									}
									... on ContentNode_Flexlayouts_FlexLayouts_Columns_ColumnLayouts_3Columns {
										column1Content
										column2Content
										column3Content
										fieldGroupName
									}
								}
							}
							... on ContentNode_Flexlayouts_FlexLayouts_Hero {
								fieldGroupName
								settings {
									imageSettings {
										fieldGroupName
										height
										toggleParallax
									}
									fieldGroupName
								}
								image {
									sourceUrl(size: FLEX_HERO)
								}
							}
							... on ContentNode_Flexlayouts_FlexLayouts_SectionHeading {
								fieldGroupName
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