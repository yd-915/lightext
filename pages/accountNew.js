import React from 'react';
import BasePage from '../components/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import AccountForm from '../components/account/AccountForm';



class AccountNew extends React.Component {

  constructor(props){
    super();
    this.saveAccount = this.saveAccount.bind(this);
  }
  saveAccount(accountData) {
    alert(JSON.stringify(accountData, null, 2));
  }

  renderSecretPage() {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated){
      return(
        <BaseLayout {...this.props.auth}>
        <BasePage>
         <div className="account-new">
           <AccountForm onSumbit={this.saveAccount}/>
         </div>
        </BasePage>
     </BaseLayout>
      )
    } else {
      return (
      <BaseLayout {...this.props.auth}>
      <BasePage>
       <div className="account-new">
         <h1>You must login/create an account</h1>
       </div>
      </BasePage>
   </BaseLayout>
      )
    }
  }

   render(){
    return this.renderSecretPage()
   }
}
  
export default AccountNew;