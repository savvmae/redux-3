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
        this.withdrawFive = this.withdrawFive.bind(this);
        this.withdrawTen = this.withdrawTen.bind(this);
        this.withdrawTwenty = this.withdrawTwenty.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    withdrawFive() {
        this.props.withdrawFunds(5);
        this.toggle()
        // window.location.pathname = `/users/${this.props.user._id}/${this.props.account.id}`
    }
    withdrawTen() {
        this.props.withdrawFunds(10);
        this.toggle();
    }
    withdrawTwenty() {
        this.props.withdrawFunds(20);
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
                        <Button color="primary" onClick={this.withdrawFive}>$5</Button>{' '}
                        <Button color="secondary" onClick={this.withdrawTen}>$10</Button>{' '}
                        <Button color="gray" onClick={this.withdrawTwenty}>$20</Button>{' '}
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