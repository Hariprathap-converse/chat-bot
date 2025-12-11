declare module 'simplebar-react' {
  import type { ComponentProps } from 'react';
  import { default as SimpleBarReact } from 'simplebar-react/dist/simplebar-react';

  export type SimpleBarProps = ComponentProps<typeof SimpleBarReact>;

  const SimpleBar: React.FC<SimpleBarProps>;
  export default SimpleBar;
}
