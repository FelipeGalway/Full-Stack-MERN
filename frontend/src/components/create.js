import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    nivel: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const allowedLevels = ["Júnior", "Pleno", "Sênior"];

    if (!form.nome || !form.cargo || !form.nivel) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    if (!allowedLevels.includes(form.nivel)) {
      alert("Nível inválido. Escolha entre: Júnior, Pleno ou Sênior.");
      return;
    }

    const newPerson = { ...form };

    await fetch("http://localhost:5050/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ nome: "", cargo: "", nivel: "" });
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h4 className="mb-4">Criar novo registro</h4>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={form.nome}
              onChange={(e) => updateForm({ nome: e.target.value })}
              placeholder="Ex: João da Silva"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cargo" className="form-label">Cargo</label>
            <input
              type="text"
              className="form-control"
              id="cargo"
              value={form.cargo}
              onChange={(e) => updateForm({ cargo: e.target.value })}
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
                    nome="nivel"
                    id={`nivel-${lvl}`}
                    value={lvl}
                    checked={form.nivel === lvl}
                    onChange={(e) => updateForm({ nivel: e.target.value })}
                  />
                  <label className="form-check-label" htmlFor={`nivel-${lvl}`}>
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
