import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { recordSchema } from "../validators/recordValidator";

export default function Edit() {
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    nivel: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/records/${id}`);

      if (!response.ok) {
        alert(`Erro ao buscar o registro: ${response.statusText}`);
        navigate("/");
        return;
      }

      const record = await response.json();
      if (!record) {
        alert(`Registro com ID ${id} não encontrado.`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
    setErrors((prev) => ({
      ...prev,
      ...Object.keys(value).reduce((acc, key) => {
        const check = recordSchema.shape[key]?.safeParse(value[key]);
        if (check && !check.success) acc[key] = check.error.issues[0].message;
        else delete prev[key];
        return acc;
      }, {}),
    }));
    setGeneralError("");
  }

  async function onSubmit(e) {
    e.preventDefault();

    const result = recordSchema.safeParse(form);
    if (!result.success) {
      if (result.error?.errors && result.error.errors.length > 0) {
        const fieldErrors = {};
        for (const err of result.error.errors) {
          if (err.path && err.path.length > 0) {
            fieldErrors[err.path[0]] = err.message;
          }
        }
        setErrors(fieldErrors);
      } else {
        setGeneralError(
          "Por favor, corrija os campos destacados antes de salvar."
        );
      }
      return;
    }

    try {
      await fetch(`http://localhost:5050/records/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      navigate("/");
    } catch (error) {
      setGeneralError("Erro ao salvar alterações. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h4 className="mb-4">Editar Registro</h4>
        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              id="nome"
              value={form.nome}
              onChange={(e) => updateForm({ nome: e.target.value })}
            />
            {errors.nome && (
              <div className="invalid-feedback">{errors.nome}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="cargo" className="form-label">
              Cargo
            </label>
            <input
              type="text"
              className={`form-control ${errors.cargo ? "is-invalid" : ""}`}
              id="cargo"
              value={form.cargo}
              onChange={(e) => updateForm({ cargo: e.target.value })}
            />
            {errors.cargo && (
              <div className="invalid-feedback">{errors.cargo}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Nível</label>
            <div className="d-flex gap-3">
              {["Júnior", "Pleno", "Sênior"].map((lvl) => (
                <div className="form-check" key={lvl}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="nivel"
                    id={`edit-nivel-${lvl}`}
                    value={lvl}
                    checked={form.nivel === lvl}
                    onChange={(e) => updateForm({ nivel: e.target.value })}
                  />
                  <label className="form-check-label" htmlFor={`edit-nivel-${lvl}`}>
                    {lvl}
                  </label>
                </div>
              ))}
            </div>
            {errors.nivel && (
              <div className="text-danger mt-1">{errors.nivel}</div>
            )}
          </div>

          {generalError && (
            <div className="alert alert-danger mt-3" role="alert">
              {generalError}
            </div>
          )}

          <div className="mt-3">
            <button type="submit" className="btn btn-success">
              Salvar alterações
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
