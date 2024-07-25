import { visit } from 'unist-util-visit';
import slugify from 'slugify';

export default function customSlug() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      const text = node.children.map((child) => child.value).join('');
      const id = slugify(text, { lower: true, remove: /[*+~.()'"!:@]/g });
      node.data = {
        ...node.data,
        id,
      };
    });
  };
}
