import { InlineCode } from './Collapsible';
import { Fragment } from 'astro/components';

export const MDXInlineCode = ({ children }) => (
  <InlineCode>
    <Fragment>{children}</Fragment>
  </InlineCode>
);