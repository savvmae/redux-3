import {combineReducers} from 'redux';
import {USER_SELECTED, ACCOUNT_SELECTED, WITHDRAW_FUNDS} from '../actions/index';
import userList from '../data/users';
import update from 'immutability-helper';

const initialState = {
    users: userList(),
    selectedUser: null,
    selectedAccount: null
}

const reducer = function(state = initialState, action) {
    switch (action.type) {
        case USER_SELECTED:
            const user = state.users.find(user => action.payload === user._id)
            return update(state, {
                selectedUser: {
                    $set: user
                }
            });
        case ACCOUNT_SELECTED:
            return update(state, {
                selectedAccount: {
                    $set: action.payload
                }
            })

        case WITHDRAW_FUNDS:
            const userIdx = state.users.findIndex(user => user._id === state.selectedUser._id);
            const accountIdx = state.users[userIdx].accounts.findIndex(account => account.id === state.selectedAccount.id);

            return update(state, {
                
                users: {
                    [userIdx]: {
                        accounts: {
                            [accountIdx]: {
                                balance: {
                                    $apply: function(balance) {
                                        return balance - action.payload
                                    }
                                }
                            }
                        }
                    }
                },
                selectedAccount: {
                    balance: {
                        $apply: function(balance) {
                            return balance - action.payload
                        }
                    }
                }
            })
        default:
            return state;
    }
}

export default reducer;
