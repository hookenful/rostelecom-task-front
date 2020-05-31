import React, {Component} from 'react';

import {Table, Container} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';

import {AddUserModal} from './AddUserModal';
import {EditUserModal} from './EditUserModal';

export class Users extends Component {

    constructor(props){
        super(props);
        this.state = {users:[], addModalShow: false, editModalShow: false}

    }

    componentDidMount()
    {
        this.refreshList();
    }

    refreshList()
    {
       fetch("https://rostelecomtaskapi20200531200554.azurewebsites.net/api/users")
       .then(response=> response.json())
       .then(data=> { 
        this.setState({users:data});
       });
    }

    deleteUser(userid)
    {
    if (window.confirm('Are you sure ?'))
    {
        fetch("https://rostelecomtaskapi20200531200554.azurewebsites.net/api/users/" + userid, {
            method:'DELETE',
            header: { "Accept":"application/json",
                      "Content-Type":"application/json",
                       "Origin": "*"
            },
        
        })
        .then(result =>this.setState(this.refreshList))
        
    }
    }

    
    render(){
        const {users, userid, username, fullname, departmentid} = this.state;
     let addModalClose = () => this.setState({addModalShow:false}, this.refreshList)
     let editModalClose = () => this.setState({editModalShow:false}, this.refreshList)
    return (
        <div>
        <Table className = "mt-4" striped bordered hover size ="sm">
       <thead>
           <tr>
               <th>UserID</th>
               <th>UserName</th>
               <th>FullName</th>
               <th>Department</th>
               <th>Options</th>
           </tr>
       </thead>
       <tbody>
           {users.map(user=> 
               <tr key = {user.id}> 
               <td>{user.id}</td>
               <td>{user.userName}</td>
               <td>{user.fullName}</td>
               <td>{user.department && user.department.name}</td>
               <td>
                   <ButtonToolbar>
                       <Button
                       className ="mr-2" variant ="info"
                       onClick = {() => this.setState({editModalShow:true,
                        userid: user.id,
                          username: user.userName, 
                          fullname: user.fullName,
                          departmentid: user.department && user.department.id })}
                       >
                           Edit
                       </Button>
                       <Button
                           className ="mr-2" 
                           onClick ={() => this.deleteUser(user.id)}
                           variant ="danger">
                           Delete
                       </Button>
                       <EditUserModal
                       show = {this.state.editModalShow}
                       onHide = {editModalClose}
                       userid = {userid}
                       username = {username}
                       fullname = {fullname}
                       departmentid ={departmentid}/>
                   </ButtonToolbar>
               </td>
               </tr>
               )}
       </tbody>
        </Table>
        <ButtonToolbar>
       <Button variant = "primary" onClick = {() => this.setState({addModalShow: true})}>Add User</Button>
       <AddUserModal 
       show ={this.state.addModalShow} 
       onHide ={addModalClose}/>
   </ButtonToolbar>
   </div>
    )
    }
}