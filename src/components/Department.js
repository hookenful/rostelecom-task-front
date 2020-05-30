import React, {Component} from 'react';
import {Table, Container} from 'react-bootstrap';

export class Department extends Component {

    constructor(props){
        super(props);
        this.state = {deps:[]}
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
     const {deps} = this.state;
    return (
     <Table className = "mt-4" striped bordered hover size ="sm">
    <thead>
        <tr>
            <th>DepartmentID</th>
            <th>DepartmentName</th>
        </tr>
    </thead>
    <tbody>
        {deps.map(dep=> 
            <tr key = {dep.id}> 
            <td>{dep.id}</td>
            <td>{dep.name}</td>
            </tr>
            )}
    </tbody>
     </Table>
    )
    }
}