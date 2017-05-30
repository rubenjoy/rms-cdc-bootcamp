// We only need to import the modules necessary for initial render
import AppLayout from './layouts/AppLayout'
import Login from './scenes/login/scenes/Login'
import TabProfile from './scenes/main/scenes/TabProfile'
import TabHistory from './scenes/main/scenes/TabHistory'
import TabAddress from './scenes/main/scenes/TabAddress'
import TabGrade from './scenes/main/scenes/TabGrade'
import TabFamily from './scenes/main/scenes/TabFamily'
import TabLocation from './scenes/main/scenes/TabLocation'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */



const requireAuth = (store, nextState, replace) => {
  debugger
  const authenticated = store.getState().account.accessToken;
  const pathname = nextState.location.pathname;
  if (!authenticated && pathname != '/login') replace('/login');
}

export const createRoutes = (store) => ({
  path        : '/',
  component   : AppLayout,
  indexRoute  : {
      component: TabProfile,
      onEnter: requireAuth.bind(this, store)
  },
  childRoutes : [
    {
      path: '/profile',
      component: TabProfile
    },
    {
      path: '/history',
      component: TabHistory
    },
    {
      path: '/grades',
      component: TabGrade
    },
    {
      path: '/family',
      component: TabFamily
    },
    {
      path: '/address',
      component: TabAddress
    },
    {
      path: '/locations',
      component: TabLocation
    },
    {
        path: '/login',
        component: Login
    }
  ],
  routes: [
  {
      path: '/login',
      component: Login
  }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
