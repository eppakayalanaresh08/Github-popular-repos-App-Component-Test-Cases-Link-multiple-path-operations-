import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.avatar_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repositories-list">
        {repositoriesData.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageFilterId: newFilterId}, this.getRepositories)
  }

  renderLanguageFiltersList = () => {
    const {activeLanguageFilterId} = this.state

    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            key={eachLanguageFilter.id}
            isActive={eachLanguageFilter.id === activeLanguageFilterId}
            languageFilterDetails={eachLanguageFilter}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFiltersList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos

// import {Component} from 'react'

// import Loader from 'react-loader-spinner'

// // import Cookies from 'js-cookie'

// import LanguageFilterItem from '../LanguageFilterItem'

// import RepositoryItem from '../RepositoryItem'

// import './index.css'

// const languageFiltersData = [
//   {id: 'ALL', language: 'All'},
//   {id: 'JAVASCRIPT', language: 'Javascript'},
//   {id: 'RUBY', language: 'Ruby'},
//   {id: 'JAVA', language: 'Java'},
//   {id: 'CSS', language: 'CSS'},
// ]

// const operationGiveSwitch = {
//   isFailureRepos: 'FAILURE',
//   isLoading: 'LOADING',
//   isRenderSuccess: 'SUCCESS',
// }

// class GithubPopularRepos extends Component {
//   state = {
//     listRepository: [],
//     isActivePresent: languageFiltersData[0].id,
//     renderActive: operationGiveSwitch.isLoading,
//   }

//   componentDidMount() {
//     // Cookies.set('jwt_token', jwtToken, {expires: 90})
//     this.getMount()
//   }

//   getMount = async () => {
//     this.setState({renderActive: operationGiveSwitch.isLoading})
//     const {isActivePresent} = this.state
//     const url = `https://apis.ccbp.in/popular-repos?language=${isActivePresent}`
//     // const option = {
//     //   method: 'GET',
//     // }
//     const fetchData = await fetch(url)
//     if (fetchData.ok === true) {
//       const data = await fetchData.json()
//       console.log(fetchData)
//       const updateData = data.popular_repos.map(eachObject => ({
//         name: eachObject.name,
//         id: eachObject.id,
//         issuesCount: eachObject.issues_count,
//         forksCount: eachObject.forks_count,
//         starsCount: eachObject.stars_count,
//         avatarUrl: eachObject.avatar_url,
//       }))
//       this.setState({
//         listRepository: updateData,
//         renderActive: operationGiveSwitch.isRenderSuccess,
//       })
//     } else if (fetchData.status === 401) {
//       this.setState({renderActive: operationGiveSwitch.isFailureRepos})
//     }
//     // }
//     // console.log(fetchData)
//   }

//   onEachPopularClick = id => {
//     this.setState({isActivePresent: id}, this.getMount)
//   }

//   renderSuccessActive = () => {
//     const {listRepository} = this.state
//     return (
//       <>
//         {listRepository.map(eachObjectItem => (
//           <RepositoryItem
//             ListEachItem={eachObjectItem}
//             key={eachObjectItem.id}
//           />
//         ))}
//       </>
//     )
//   }

//   renderFailureActive = () => (
//     <div>
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
//         alt="failure view"
//       />
//     </div>
//   )

//   renderLoadingActive = () => (
//     <div data-testid="loader" className="loader-Element">
//       <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
//     </div>
//   )

//   // eslint-disable-next-line consistent-return
//   renderPresentActive = () => {
//     const {renderActive} = this.state
//     // eslint-disable-next-line default-case
//     switch (renderActive) {
//       case operationGiveSwitch.isRenderSuccess:
//         return this.renderSuccessActive()
//       case operationGiveSwitch.isFailureRepos:
//         return this.renderFailureActive()
//       case operationGiveSwitch.isLoading:
//         return this.renderLoadingActive()
//     }
//   }

//   render() {
//     // const {listRepository} = this.state
//     return (
//       <div className="bg-container">
//         <h1 className="popular-heading">Popular</h1>
//         <ul className="popular-buttons-list">
//           {languageFiltersData.map(eachObject => (
//             <LanguageFilterItem
//               languageEach={eachObject}
//               key={eachObject.id}
//               onEachPopularClick={this.onEachPopularClick}
//             />
//           ))}
//         </ul>
//         <ul className="popular-display-list">{this.renderPresentActive()}</ul>
//       </div>
//     )
//   }
// }

// export default GithubPopularRepos
