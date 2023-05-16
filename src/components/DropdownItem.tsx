/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import './styles/dropdown.css';
import { DropdownItemProps } from '../@types/Search';

const DropdownItem = ({ index, children: result, onClickResult }: DropdownItemProps) => {
  const { inputText, activeIndex } = useSearchState();
  const { inactivate } = useSearchDispatch();

  const keywordRegex = new RegExp(`(${inputText})`, 'gi');
  const texts = result.split(keywordRegex);

  return (
    <div>
      <li
        className={index === activeIndex ? 'DropdownItem active' : 'DropdownItem'}
        onMouseLeave={inactivate}
        onClick={() => onClickResult(result)}
      >
        {texts.map((text, idx) => {
          const key = text + idx;
          if (text.toLowerCase() === inputText.toLowerCase()) {
            return (
              <span key={key} className="highlight">
                {text}
              </span>
            );
          }
          return <span>{text}</span>;
        })}
      </li>
    </div>
  );
};

export default DropdownItem;
