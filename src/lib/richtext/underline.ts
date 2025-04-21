import { visit } from 'unist-util-visit';
import type { Plugin } from 'carta-md';

export const underline = (): Plugin => {
	return {
		transformers: [
			{
				execution: 'sync',
				type: 'remark',
				transform: ({ processor }) => {
					processor.use(() => (tree) => {
						visit(tree, 'text', (node: any, index, parent) => {
							const regex = /\+\+([^\+]+)\+\+/g;
							const value = node.value;
							if (!regex.test(value)) {
								return;
							}

							const parts = [];
							let lastIndex = 0;
							regex.lastIndex = 0;

							for (const match of value.matchAll(regex)) {
								const [fullMatch, underlineText] = match;
								const start = match.index!;
								const end = start + fullMatch.length;

								if (start > lastIndex) {
									parts.push({
										type: 'text',
										value: value.slice(lastIndex, start)
									});
								}

								parts.push({
									type: 'underline',
									data: {
										hName: 'u'
									},
									children: [
										{
											type: 'text',
											value: underlineText
										}
									]
								});

								lastIndex = end;
							}

							// text sau phần gạch chân
							if (lastIndex < value.length) {
								parts.push({
									type: 'text',
									value: value.slice(lastIndex)
								});
							}

							if (parent && typeof index === 'number') {
								parent.children.splice(index, 1, ...parts);
							}
						});
					});
				}
			}
		]
	};
};
