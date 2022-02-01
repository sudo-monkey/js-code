'use strict';

const { Contract } = require ('fabric-contract-api');
const accountObjType = "Account";

class BalanceTransfer extends Contract {

    async initAccount(ctx, id, balance) {
        const accountBalance = parseFloat(balance);
    
        if (accountBalance < 0) {
            throw new Error(`account balance cannot be negative`);
        }
        const account = {
            id: id, 
            owner: this._getTxCreatorUID(ctx),
            balance: accountBalance
        }
        if (await this._accountExists(ctx, account.id)) {
            throw new Error(`the account ${account.id} already exists`);
        }
        await this._putAccount(ctx, account);
    }
    async setBalance(ctx, id) {
    }

    async transfer(ctx, idFrom, idTo, amount) {}
    
    async listAccounts (ctx) {
        const account = {
            id: id, 
            owner: this._getTxCreatorUID(ctx),
            balance: accountBalance
        }

        //set ID to original creator
        const id = this._getTxCreatorUID(ctx)
        //getID match with ctxid , then getAccount
        return this._getAccount(ctx, account.id)
    }

    async _accountExists(ctx, id) {
        const compositeKey = ctx.stub.createCompositeKey(accountObjType,[id]);
        const accountBytes = await ctx.stub.getState(compositeKey);
        return accountBytes && accountBytes.length > 0;
    }
    async _getAccount(ctx, id) {
        const compositeKey = ctx.stub.createCompositeKey(accountObjType, [id]);
        return JSON.parse(accountBytes.toString());
    }
    async _putAccount(ctx, account) {
        const compositeKey = ctx.stub.createCompositeKey(accountObjType,
        [account.id]);
    await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(account)));
    }

    _getTxCreatorUID(ctx) {
        return JSON.stringify({
        mspid: ctx.clientIdentity.getMSPID(),
        id: ctx.clientIdentity.getID()
        });
    
    }

}




module.exports = BalanceTransfer;




