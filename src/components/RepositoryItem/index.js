import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    imageUrl,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails

  return (
    <li className="repository-item">
      <img className="repository-image" src={imageUrl} alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stats-text">{starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stats-text">{forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="stats-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

// import './index.css'

// const RepositoryItem = props => {
//   const {ListEachItem} = props
//   const {name, issuesCount, forksCount, starsCount, avatarUrl} = ListEachItem
//   return (
//     <li className="card-Item-bg">
//       <img src={avatarUrl} alt={name} className="avatar-url" />
//       <h1 className="name-Item">{name}</h1>
//       <div>
//         <div className="each-card-container-description">
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
//             alt="stars"
//             className="card-each-image"
//           />
//           <p className="count">{starsCount} stars</p>
//         </div>
//         <div className="each-card-container-description">
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
//             alt="forks"
//             className="card-each-image"
//           />
//           <p className="count">{forksCount}</p>
//         </div>
//         <div className="each-card-container-description">
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
//             alt="open issues"
//             className="card-each-image"
//           />
//           <p className="count">{issuesCount}</p>
//         </div>
//       </div>
//     </li>
//   )
// }
// export default RepositoryItem
