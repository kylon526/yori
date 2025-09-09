const noDeepCardsRule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow more than 5 nested <Card> components',
			recommended: false
		},
		schema: []
	},
	create(context) {
		let depth = 0;

		function isCardComponent(node) {
			return (
				node.type === 'SvelteElement' &&
				node.name &&
				node.name.type === 'Identifier' &&
				node.name.name === 'Card'
			);
		}

		return {
			SvelteElement(node) {
				if (isCardComponent(node)) {
					depth++;
					if (depth > 5) {
						context.report({
							node,
							message: `Too many nested <Card> components (depth=${depth}, max=5).`
						});
					}
				}
			},
			'SvelteElement:exit'(node) {
				if (isCardComponent(node)) {
					depth--;
				}
			}
		};
	}
};

export default noDeepCardsRule;
