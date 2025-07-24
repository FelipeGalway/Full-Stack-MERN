import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const allowedLevels = ["Júnior", "Pleno", "Sênior"];

    if (!form.name || !form.position || !form.level) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    if (!allowedLevels.includes(form.level)) {
      alert("Nível inválido. Escolha entre: Júnior, Pleno ou Sênior.");
      return;
    }

    const newPerson = { ...form };

    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", position: "", level: "" });
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h4 className="mb-4">Criar novo registro</h4>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              placeholder="Ex: João da Silva"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-label">Cargo</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.position}
              onChange={(e) => updateForm({ position: e.target.value })}
              placeholder="Ex: Desenvolvedor"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nível</label>
            <div className="d-flex gap-3">
              {["Júnior", "Pleno", "Sênior"].map((lvl) => (
                <div className="form-check" key={lvl}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="level"
                    id={`level-${lvl}`}
                    value={lvl}
                    checked={form.level === lvl}
                    onChange={(e) => updateForm({ level: e.target.value })}
                  />
                  <label className="form-check-label" htmlFor={`level-${lvl}`}>
                    {lvl}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">Salvar</button>
        </form>
      </div>
    </div>
  );
}
