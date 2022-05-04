import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './index.less'
import './i18n'

class App extends Component {
    render() {
        return (
            <div id='sign-in-container'>
                Sign in component
            </div>
        )
    }
}

ReactDOM.render(React.createElement(App, {}, null),
    document.getElementById('sign-in-app')
);