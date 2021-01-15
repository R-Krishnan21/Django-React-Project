import axios from 'axios';

class AuthHandler {
    
    static getLoginToken(){
        return localStorage.getItem("token")
    }

    static getLoginRefresh(){
        return localStorage.getItem("refresh")
    }

    static isLoggedIn() { 
        if(this.getLoginToken() && this.getLoginRefresh()){
            return true;
        } else{
            return false;
        }
    }

    static logoutUser(){
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
    }

    //Create New Access Token
    static createAccessToken(){
        let data = {
            refresh:this.getLoginRefresh()
        }
        axios.post('http://127.0.0.1:8000/refreshtoken/',data)
            .then( res => {
                if (res.status === 200){
                    localStorage.setItem("token", res.data.access)
                }
            })
            .catch( err => {
                console.log(err)
            })
    }

    //Check Access Token and Create Token
    static checkAccessTokenExpiry(){
        if(this.getLoginToken() && this.getLoginRefresh()){
            let expTime;
            let token = this.getLoginToken();
            let tokenArray = token.split(".")
            let jwt = JSON.parse(atob(tokenArray[1]))
            if(jwt && jwt.exp && Number.isFinite(jwt.exp)){
                expTime=jwt.exp*1000
                console.log(new Date())
                console.log(new Date(expTime))
                if(new Date() > new Date(expTime)){
                    this.createAccessToken()
                }
            }
        } 
    }

    static getUserID(){
        let token = AuthHandler.getLoginToken();
        let tokenArray = token.split(".")
        let jwt = JSON.parse(atob(tokenArray[1]))
        let user_id = jwt.user_id
        return user_id
    }

    static isOwner(id){
        if(AuthHandler.isLoggedIn()){
            if(id === this.getUserID()){
                return true;
            } else {
                return false;
            }
        }
    }
}

export default AuthHandler;