import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
import { selectAccount, selectUser } from '../actions/index';
import Transaction from './Transaction';


export class AccountDetail extends Component {
    constructor(props) {
        super(props)
    }
    render() {  
     
            return (
        
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">Account Information</h4>
                            <p>{this.props.account.accountType} for {this.props.user.name}</p>
                            <p> Balance: {this.props.account.balance}</p>

                        </div>
                        <Link className="btn btn-primary" to="/users" >Back to List of Users</Link>
                        <Transaction />
                    </div>


                </div>
            );
        }
}

function mapStateToProps(state) {
    return {
        user: state.selectedUser,
        account: state.selectedAccount
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectUser: selectUser,
        selectAccount: selectAccount
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
