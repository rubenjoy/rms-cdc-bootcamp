import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { dispatchFetchEmployees, getOffices, getJobFamilies } from '../data/employees/actionCreators'
import { syncHistoryWithStore } from 'react-router-redux'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  componentDidMount() {
    // Initializing employee list when empty
    if (this.props.store.getState().employees.employees.length === 0) {
      dispatchFetchEmployees(this.props.store)();
    }    
    getOffices(this.props.store)();
    getJobFamilies(this.props.store)();
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)

    return (
      <Provider store={store}>
        <Router history={history} children={routes} />
      </Provider>
    )
  }
}

export default AppContainer
