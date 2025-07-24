import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5050/record/${id}`);

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
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (!form.name || !form.position || !form.level) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        const editedRecord = {
            name: form.name,
            position: form.position,
            level: form.level,
        };

        await fetch(`http://localhost:5050/record/${params.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedRecord),
        });

        navigate("/");
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h4 className="mb-4">Editar Registro</h4>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={form.name}
                            onChange={(e) => updateForm({ name: e.target.value })}
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
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nível</label>
                        <div className="d-flex gap-3">
                            {["Intern", "Junior", "Senior"].map((lvl) => (
                                <div className="form-check" key={lvl}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="level"
                                        id={`edit-level-${lvl}`}
                                        value={lvl}
                                        checked={form.level === lvl}
                                        onChange={(e) => updateForm({ level: e.target.value })}
                                    />
                                    <label className="form-check-label" htmlFor={`edit-level-${lvl}`}>
                                        {lvl}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success mt-3">Salvar alterações</button>
                </form>
            </div>
        </div>
    );
}
