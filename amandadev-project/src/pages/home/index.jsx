import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers(); // recarrega
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>User registration</h1>
        <input placeholder="Nome" type="text" ref={inputName} />
        <input placeholder="Idade" type="number" ref={inputAge} />
        <input placeholder="E-mail" type="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          Register
        </button>
      </form>

      {users.map((user) => (
        <div className="card" key={user._id}>
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Age: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>

          <button onClick={() => deleteUser(user._id)}>
            <img src={Trash} alt="trash" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
