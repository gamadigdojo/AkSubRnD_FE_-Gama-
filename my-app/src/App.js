import { useState } from "react";
import "./App.css";
import List from "./List";
import { uid } from "uid";
import logo from './logo.svg';

function App() {

const [contacts,  setContacts] = useState ([

]);

const [formData, setFormData] = useState({
  name: "",
  telp: "",
});

const [isUpdate, setIsUpdate] = useState({id:null,status:false});

function handleChange (e){
  let data = {...formData};
  data[e.target.name] = e.target.value;
  setFormData(data);
}

function handleSubmit(e){
  e.preventDefault();
  let data = [...contacts];

  if(formData.name === ""){
    return false;
  }
  if(formData.telp === ""){
    return false;
  }

  if(isUpdate.status){
    data.forEach((contact) => {
      if(contact.id === isUpdate.id){
        contact.name = formData.name
        contact.telp = formData.telp
      } 
    });
  }else{
    data.push({id: uid(),name: formData.name,telp: formData.telp});
  }
  setIsUpdate({id: null, status: false})
  setContacts(data);
  setFormData({name:"",telp:""})
}

  function handleEdit(id){
    let data = [...contacts];
    let foundData = data.find(contact => contact.id === id);
    setFormData({name: foundData.name, telp: foundData.telp})
    setIsUpdate({id: id, status:true})
  }


  function handleDelete(id){
    let data = [...contacts];
    let filteredData = data.filter(contact => contact.id !==id);
    setContacts(filteredData);
  }
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="px-3 py-3 header">My Student</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.name} name="name" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">Number</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.telp} name="telp" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List handleEdit ={handleEdit} handleDelete={handleDelete} data={contacts}/>
    </div>
  );
}

export default App;