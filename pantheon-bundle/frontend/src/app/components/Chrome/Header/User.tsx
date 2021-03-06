import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
    Button, Dropdown,
    DropdownToggle,
    DropdownItem, Modal, DropdownPosition
} from "@patternfly/react-core"
import { HelpIcon } from "@patternfly/react-icons"
import "@app/app.css"
import { IAppState } from "@app/app"

interface IState {
    helpDropdownOpen: boolean
}

class User extends Component<IAppState, IState> {
    constructor(props) {
        super(props)
        this.state = {
            helpDropdownOpen: false
        }
    }

    public render() {
        const dropdownItems = [
            <DropdownItem key="help" href="/pantheon/docs/assemblies/assembly-pantheon-help.html" target="_blank">Help</DropdownItem>,
            <DropdownItem key="contribute" href="https://github.com/redhataccess/pantheon" target="_blank">Contribute to Pantheon</DropdownItem>
        ]
        return (
            <React.Fragment>
                <Dropdown onSelect={this.onHelpSelect}
                        toggle={
                            <DropdownToggle toggleIndicator={null} onToggle={this.onHelpToggle}>
                                <HelpIcon />
                            </DropdownToggle>
                        }
                        isPlain={true}
                        isOpen={this.state.helpDropdownOpen}
                        dropdownItems={dropdownItems}
                        position={DropdownPosition.right}
                />
                <Link className="p2-header__login"
                        to={this.props.userAuthenticated ? "" : "/login"}
                        onClick={this.conditionalRedirect}>
                    {this.props.userAuthenticated ? "Log Out [" + this.props.username + "]" : "Log In"}
                </Link>
            </React.Fragment>
        )
    }

    private onHelpToggle = helpDropdownOpen => {
        this.setState({ helpDropdownOpen })
    }

    private onHelpSelect = () => {
        this.setState({
            helpDropdownOpen: !this.state.helpDropdownOpen
        })
    }

    private conditionalRedirect = () => {
        if (this.props.userAuthenticated) {
            fetch("/system/sling/logout")
                .then(response => window.location.href = "/pantheon")
        }
    }
}

export { User }