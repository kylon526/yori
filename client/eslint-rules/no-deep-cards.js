const noDeepCardsRule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow more than 5 nested .card elements',
			recommended: false
		},
		schema: [] // no options
	},
	create(context) {
		// Helper: recursively count card depth
		function checkNode(node, depth = 0) {
			if (
				node.type === 'SvelteElement' &&
				node.startTag.attributes.some(
					(attr) =>
						attr.type === 'SvelteAttribute' &&
						attr.key.name === 'class' &&
						attr.value.some((v) => v.type === 'SvelteLiteral' && v.value.includes('card'))
				)
			) {
				depth++;
				if (depth > 5) {
					context.report({
						node,
						message: `Too many nested .card elements (depth=${depth}, max=5).`
					});
				}
			}

			if (node.children) {
				node.children.forEach((child) => checkNode(child, depth));
			}
		}

		return {
			SvelteElement(node) {
				checkNode(node, 0);
			}
		};
	}
};

export default noDeepCardsRule;
