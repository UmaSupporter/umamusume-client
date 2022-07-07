import React, { useReducer } from 'react';
import { TraitDropdown } from './TraitDropdown';
import './CardFilter.scss';

interface Trait {
  name: string;
  type: string;
}

type Action =
  | { type: 'add'; trait: Trait }
  | { type: 'remove'; index: number }
  | { type: 'clear' };

const CardFilter: React.FC<{}> = () => {
  const [traits, dispatch] = useReducer((state: Trait[], action: Action) => {
    switch (action.type) {
      case 'add':
        if (
          action.trait.type !== 'common' &&
          state.filter((x) => x.type === action.trait.type).length >= 3
        )
          return state;
        return [...state, action.trait];
      case 'remove':
        return state.filter((_, i) => i !== action.index);
      case 'clear':
        return [];
    }
  }, []);

  return (
    <div className={`CardFilter`}>
      <TraitDropdown
        items={stats}
        type="status"
        onChange={(_, v) =>
          v && dispatch({ type: 'add', trait: { name: v, type: 'status' } })
        }
      />
      <TraitDropdown
        items={stats}
        type="aptitude"
        onChange={(_, v) =>
          v && dispatch({ type: 'add', trait: { name: v, type: 'aptitude' } })
        }
      />
      <TraitDropdown
        items={stats}
        type="unique"
        onChange={(_, v) =>
          v && dispatch({ type: 'add', trait: { name: v, type: 'unique' } })
        }
      />
      <TraitDropdown
        items={stats}
        type="common"
        onChange={(_, v) =>
          v && dispatch({ type: 'add', trait: { name: v, type: 'common' } })
        }
      />
    </div>
  );
};

const stats = ['스킬1', '스킬2', '스킬3'];

export default CardFilter;
