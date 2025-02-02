import type {ElementProps, FloatingContext} from '../types';
import {useId} from './useId';

export interface Props {
  enabled?: boolean;
  role?: 'tooltip' | 'dialog' | 'menu' | 'listbox' | 'grid' | 'tree';
}

/**
 * Adds relevant screen reader props for a given element `role`.
 */
export const useRole = (
  {open}: FloatingContext,
  {enabled = true, role = 'dialog'}: Partial<Props> = {}
): ElementProps => {
  const rootId = useId();
  const floatingProps = {id: rootId, role};

  if (!enabled) {
    return {};
  }

  if (role === 'tooltip') {
    return {
      reference: {
        'aria-describedby': open ? rootId : undefined,
      },
      floating: floatingProps,
    };
  }

  return {
    reference: {
      'aria-expanded': open ? 'true' : 'false',
      'aria-haspopup': role,
      'aria-controls': open ? rootId : undefined,
      ...(role === 'listbox' && {
        role: 'combobox',
      }),
    },
    floating: floatingProps,
  };
};
