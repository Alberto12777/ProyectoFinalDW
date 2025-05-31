import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ marca: "", modelo: "", descripcion: "", valor: "", colorDisponible: "" });
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await axios.get("http://localhost:3001/cars");
    setCars(response.data);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddCar = async () => {
    if (editingCar) {
      await axios.put(`http://localhost:3001/cars/${editingCar.id}`, form);
      setEditingCar(null);
    } else {
      await axios.post("http://localhost:3001/cars", form);
    }
    setForm({ marca: "", modelo: "", descripcion: "", valor: "", colorDisponible: "" });
    fetchCars();
  };

  const handleEditCar = (car) => {
    setForm(car);
    setEditingCar(car);
  };

  const handleDeleteCar = async (id) => {
    await axios.delete(`http://localhost:3001/cars/${id}`);
    fetchCars();
  };

  const filteredCars = cars.filter((car) =>
    car.marca.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Gestión de Autos</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por marca..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="form-container">
        <input
          type="text"
          placeholder="Marca"
          value={form.marca}
          onChange={(e) => setForm({ ...form, marca: e.target.value })}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={form.modelo}
          onChange={(e) => setForm({ ...form, modelo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor"
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
        />
        <input
          type="text"
          placeholder="Colores Disponibles"
          value={form.colorDisponible}
          onChange={(e) => setForm({ ...form, colorDisponible: e.target.value })}
        />
        <button onClick={handleAddCar}>{editingCar ? "Actualizar" : "Agregar"}</button>
      </div>

      <div className="car-list">
        {filteredCars.map((car) => (
          <div className="car-item" key={car.id}>
            <h3>{car.marca}</h3>
            <p>Modelo: {car.modelo}</p>
            <p>Descripción: {car.descripcion}</p>
            <p>Valor: ${car.valor}</p>
            <p>Colores: {car.colorDisponible}</p>
            <button onClick={() => handleEditCar(car)}>Editar</button>
            <button onClick={() => handleDeleteCar(car.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;