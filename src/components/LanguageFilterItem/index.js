import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFilterDetails, setActiveLanguageFilterId} = props
  const {id, language} = languageFilterDetails
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickLanguageFilter = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li>
      <button
        className={btnClassName}
        onClick={onClickLanguageFilter}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

// import './index.css'

// const LanguageFilterItem = props => {
//   const {languageEach, onEachPopularClick} = props
//   const {language, id} = languageEach

//   const onClickItem = () => {
//     onEachPopularClick(id)
//   }

//   return (
//     <li className="list-button">
//       <button type="button" className="button-language" onClick={onClickItem}>
//         {language}
//       </button>
//     </li>
//   )
// }

// export default LanguageFilterItem
