import React, {Component} from 'react';
import {Table, Container} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';

import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

export class Department extends Component {

    constructor(props){
        super(props);
        this.state = {deps:[], addModalShow: false, editModalShow: false}
    }

    componentDidMount()
    {
        this.refreshList();
    }
    refreshList()
    {
       fetch("https://localhost:5001/api/departments")
       .then(response=> response.json())
       .then(data=> { 
        this.setState({deps:data});
       });
    }

    render(){

     const {deps, depid, depname} = this.state;
     let addModalClose = () => this.setState({addModalShow:false})
     let editModalClose = () => this.setState({editModalShow:false})
    return (
        <div>
     <Table className = "mt-4" striped bordered hover size ="sm">
    <thead>
        <tr>
            <th>DepartmentID</th>
            <th>DepartmentName</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody>
        {deps.map(dep=> 
            <tr key = {dep.id}> 
            <td>{dep.id}</td>
            <td>{dep.name}</td>
            <td>
                <ButtonToolbar>
                    <Button
                    className ="mr-2" variant ="info"
                    onClick = {() => this.setState({editModalShow:true, depid: dep.id, depname: dep.name})}
                    >
                        Edit
                    </Button>
                    <EditDepModal
                    show = {this.state.editModalShow}
                    onHide = {editModalClose}
                    depid = {depid}
                    depname = {depname}/>
                </ButtonToolbar>
            </td>
            </tr>
            )}
    </tbody>
     </Table>
     <ButtonToolbar>
    <Button variant = "primary" onClick = {() => this.setState({addModalShow: true})}>Add Department</Button>
    <AddDepModal 
    show ={this.state.addModalShow} 
    onHide ={addModalClose}/>
</ButtonToolbar>
</div>
    )
    }
}