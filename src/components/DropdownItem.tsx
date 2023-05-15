/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import './styles/dropdown.css';

interface DropdownItemProps {
  index: number;
  children: string;
}

const DropdownItem = ({ index, children: result }: DropdownItemProps) => {
  const { inputText, activeIndex } = useSearchState();
  const { hoverAction, inactivate, changeInputText } = useSearchDispatch();

  const onMouseEnter = () => hoverAction(index);
  const onClick = () => {
    hoverAction(index);
    // changeInputText(result);
    // Add TodoList
  };

  const keywordRegex = new RegExp(`(${inputText})`, 'gi');
  const texts = result.split(keywordRegex);

  return (
    <div>
      <li
        className={index === activeIndex ? 'DropdownItem active' : 'DropdownItem'}
        // onMouseEnter={onMouseEnter}
        onMouseLeave={inactivate}
        onClick={onClick}
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

// if (keywordRegex.test(text)) {
//   return (
//     <div className="keywordText" key={key}>
//       {text}
//     </div>
//   );
// }
// return <div key={key}>{text}</div>;

// {texts.map((text, idx) => {
//   const key = text + idx;
//   const hightLightText = text.split(keywordRegex);
//   {
//     hightLightText.map((hlText, index) => {
//       hlText.toLowerCase() === inputText.toLowerCase() ? (
//         <span key={index} className="hightlight">
//           {hlText}
//         </span>
//       ) : (
//         hlText
//       );
//     });
//   }
// })}
