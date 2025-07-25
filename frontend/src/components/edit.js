import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        nome: "",
        cargo: "",
        nivel: "",
    });

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

        const editedRecord = {
            nome: form.nome,
            cargo: form.cargo,
            nivel: form.nivel,
        };

        await fetch(`http://localhost:5050/records/${params.id}`, {
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
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            value={form.nome}
                            onChange={(e) => updateForm({ nome: e.target.value })}
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
                    </div>

                    <button type="submit" className="btn btn-success mt-3">Salvar alterações</button>
                </form>
            </div>
        </div>
    );
}
