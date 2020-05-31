import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, Container} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditUserModal extends Component{
    constructor(props){
        super(props)

        this.state = {deps:[], snackbaropen: false, snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    }

    componentDidMount(){
        fetch("https://localhost:5001/api/departments/")
        .then(response => response.json())
        .then(data=>{
            this.setState({deps: data});
        });
    }

    handleSubmit(event){
        fetch("https://localhost:5001/api/users/" + event.target.UserId.value, {
            method: "PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Origin": "*"
            },
            body: JSON.stringify({
                UserName: event.target.UserName.value,
                FullName: event.target.FullName.value,
                DepartmentId: event.target.DepartmentId.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>
        {
            console.log(result)
            this.setState({snackbaropen: true, snackbarmsg: "Added successfully!"})
            
        },
        (error) =>{
            this.setState({snackbaropen: true, snackbarmsg: "Failed!"})
        }
        )
    }

    render() {
        return(
            <div className = "container">
                <Snackbar 
                anchorOrigin = {{vertical:'center', horizontal:'center'}}
                open = {this.state.snackbaropen}
                autoHideDuration = {1000}
                onClose = {this.snackbarClose}
                message = {<span id ="message-id">{this.state.snackbarmsg}</span>}
                action={[<IconButton
                    key="close"
                    arial-label="close"
                    color ="inherit"
                    onClick ={this.snackbarClose}>
                    x
                    </IconButton>
                    ]}
                    />
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <Row>
                       <Col sm ={6}>
                           <Form onSubmit={this.handleSubmit}>
                           <Form.Group controlId = "UserId">
                                   <Form.Label>User Id</Form.Label>
                                   <Form.Control
                                   type ="number"
                                   name ="UserId"
                                   disabled
                                   defaultValue={this.props.userid}
                                   placeholder="UserId"/>
                               </Form.Group>
                               <Form.Group controlId = "UserName">
                                   <Form.Label>User Name</Form.Label>
                                   <Form.Control
                                   type ="text"
                                   name ="UserName"
                                   required
                                   defaultValue={this.props.username}
                                   placeholder="UserName"/>
                               </Form.Group>
                               <Form.Group controlId = "FullName">
                                   <Form.Label>Full Name</Form.Label>
                                   <Form.Control
                                   type ="text"
                                   name ="FullName"
                                   required
                                   defaultValue={this.props.fullname}
                                   placeholder="FullName"/>
                               </Form.Group>
                               <Form.Group controlId = "DepartmentId">
                                   <Form.Label>Department</Form.Label>
                                <Form.Control as = "select"
                                defaultValue={this.props.departmentid}>
                                    {this.state.deps.map(dep=>
                                       <option key = {dep.id} value = {dep.id}>{dep.name}</option>  
                                       )}

                                </Form.Control>
                               </Form.Group>
                               <Form.Group>
                                   <Button variant = "primary"
                                   type = "submit">Update User</Button>
                               </Form.Group>
                           </Form>
                       </Col>
                   </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant ="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}