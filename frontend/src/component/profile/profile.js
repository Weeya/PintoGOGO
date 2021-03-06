import React, {Component} from 'react';
import './profile.css';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'
import axios from 'axios';

class Register extends Component {
	constructor(props){
		super(props);
    this.state = {
      isLoaded: false,
			currentUser: null
		}
  }
    
  componentDidMount() {
    axios.get('/api/users/profile')
    .then(res => {
      this.setState({  
        currentUser: res.data,
        isLoaded: true
      }, () => { console.log ('test ', this.state.currentUser) });
    })
    .then(() => {
      console.log("this", this.state.currentUser)
    });
  }
      
    render() {
      if (!!!this.state.isLoaded) {
        return <React.Fragment/>
      }
      {console.log("....",this.state.currentUser)}
      const {currentUser} = this.state;
      return (
        <div className='set-screen'> {/*bg*/}
        <div className='profile-set'>
        <div className='row'>
        <div className='profile-box col-sm'> {/*register box*/}
        
          <h2> PROFILE </h2>
          {/* <br/> */}
          <img className='userpic' src='/img/navbar/user.PNG' />
          <br/>
          <br />
          <form noValidate onSubmit={this.handleSubmit}>
            <div className='form-group row'>
              <label className='control-label text-form-left' htmlFor="Firstname" >Firstname:</label> 
              <div className='col'>  
                {currentUser.first_name}
              </div> 
            </div>
            <div className='form-group row'>
              <label className='control-label text-form-left' htmlFor="Lastname" >Lastname:</label>
              <div className='col'>
                {currentUser.last_name}
              </div>
            </div>
            <div className='form-group row'>
              <label className='control-label text-form-left' htmlFor="Username" >Username:</label>
              <div className='col'>
              {currentUser.user_name}
                </div>
            </div>
            <div className='form-group row'>
              <label className='control-label text-form-left' htmlFor="Email">E-mail:</label>
              <div className='col'>
                {currentUser.email}
              </div>
            </div>
            <div className='form-group row'>
              <label className='control-label text-form-left' htmlFor="PhoneNumber">Phone Number: &nbsp;&nbsp;</label>
              <div className='col'>
                {currentUser.phonenumber}
              </div>
            </div>
            <div className='form-group row'>
              <label className='control-label text-form-left' htmlFor="PhoneNumber">Address: &nbsp;&nbsp;</label>
              <div className='col'>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle addr-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Address
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">{currentUser.address[0].address}</a>
                  <a class="dropdown-item" href="#">Address 2</a>
                  <a class="dropdown-item" href="#">Add Address</a>
                </div>
              </div> 
              </div>
            </div>
            
					<br/>
					<button width='auto' type='submit' className='btn button-confirm'> EDIT PROFILE </button>
          </form>
          </div>
        </div>
        </div>
      </div>
    
    );
  }
}

Register.propTypes = {
	registerUser: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth : state.auth,
	errors : state.errors
})


export default connect(mapStateToProps, { registerUser })(withRouter(Register));
