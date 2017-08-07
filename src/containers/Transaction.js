import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser, selectAccount, withdrawFunds } from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.withdraw = this.withdraw.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    withdraw(value) {
        this.props.withdrawFunds(value);
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button color="danger" className="btn" onClick={this.toggle}>withdrawl</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Please pick an amount to withdrawl from your {this.props.account.accountType} account
          </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.withdraw(5)}>$5</Button>{' '}
                        <Button color="secondary" onClick={() => this.withdraw(10)}>$10</Button>{' '}
                        <Button color="gray" onClick={() => this.withdraw(20)}>$20</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const userIdx = state.users.findIndex(user => user._id === state.selectedUser._id);
    const accountIdx = state.users[userIdx].accounts.findIndex(account => account.id === state.selectedAccount.id);
    return {
        account: state.selectedAccount,
        user: state.users[userIdx]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        withdrawFunds: withdrawFunds
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Transaction);


const button = document.getElementById('#button')

