import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import TaskList from './components/TaskList'
import TaskListDrag from './components/TaskListDrag'
import { withAuth } from 'fireview'

const Routes = props => {
  const isLoggedIn = props._user
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route path="/tasklist" component={TaskList} />
            <Route path="/tasklistdrag" component={TaskListDrag} />
          </Switch>
        )}
      </Switch>
    </div>
  )
}

export default withAuth(Routes)
