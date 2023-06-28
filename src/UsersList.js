import { useState } from "react";
import './UsersList.css'

const UsersList = () => {
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        usertype: "",
      });
     	
const [users, setUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([]);

      const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        setFormData((prevDataForm) => {
          return { ...prevDataForm, [name]: target.value };
        });
      };

      const setUser = (e) => {
        e.preventDefault();
        setUsers(users.concat({ ...formData, id: Date.now() }));
      };

      const removeUser = (id) => {
        const filteredUsers = users.filter(user=>user.id !== id)
        setUsers(filteredUsers)
      }

      const filterUsers = (type) => {
        if (type === 'admin') {
          const filteredAdmins = users.filter((user) => user.usertype === 'Admin');
          setFilteredUsers(filteredAdmins);
        } else if (type === 'user') {
          const filteredUsers = users.filter((user) => user.usertype === 'User');
          setFilteredUsers(filteredUsers);
        } else {
          setFilteredUsers(users);
        }
    }

    const clearAllUsers = () => {
        setUsers([]);
        setFilteredUsers([]);
      };

      console.log (formData)
      console.log (users)
      

    return (
    <div className="usersList">
        
    <form onSubmit={setUser}>
      <label class="label" htmlFor="username">User name</label>
      <input
        type="text"
        id="username"
        name="username"
        autoComplete="name"
        placeholder="User name"
        onChange={handleInputChange}
        value={formData.username}
      />
      <label class="label" htmlFor="email">User email</label>
      <input
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        placeholder="User email"
        onChange={handleInputChange}
        value={formData.email}
      />
      <label  class="label" htmlFor="usertype">User type</label>
      <select id="usertype" name="usertype" onChange={handleInputChange}>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>
      <button>Save</button>
    </form>
    <div className="list">
  {users.map((user) => {
    return (
      <div className="userItem" key={user.id} onClick={()=>removeUser(user.id)} >
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.usertype}</p>
      </div>
    );
  })}
</div>

<div className="filterButtons">
        <button onClick={() => filterUsers('admin')}>Show only Admins</button>
        
        <button onClick={() => filterUsers('all')}>Show All</button>
        <button onClick={() => filterUsers('user')}>Show only Users</button>
      </div>
      <div className="list">
        {filteredUsers.map((user) => {
          return (
            <div className="userItem" key={user.id} onClick={() => removeUser(user.id)}>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.usertype}</p>
            </div>
          );
        })}
      </div>


      <div className="clear-all">
        <button onClick={clearAllUsers}>Clear All</button> 
      </div>

  </div>
    )
    

}



export default UsersList