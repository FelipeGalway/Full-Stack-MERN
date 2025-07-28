import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = ({ record, deleteRecord }) => (
    <tr>
        <td>{record.nome}</td>
        <td>{record.cargo}</td>
        <td>
            <span className={`badge bg-${getLevelColor(record.nivel)}`}>
                {record.nivel}
            </span>
        </td>
        <td>
            <Link className="btn btn-sm btn-outline-primary me-2" to={`/edit/${record._id}`}>
                Editar
            </Link>
            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteRecord(record._id)}>
                Excluir
            </button>
        </td>
    </tr>
);

function getLevelColor(nivel) {
    switch (nivel) {
        case "Júnior":
            return "secondary";
        case "Pleno":
            return "info";
        case "Sênior":
            return "success";
        default:
            return "light";
    }
}

export default function RecordList() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5050/records/`);
            if (!response.ok) {
                window.alert("Erro ao buscar registros.");
                return;
            }
            const data = await response.json();
            setRecords(data);
        }

        getRecords();
    }, []);

    async function deleteRecord(id) {
        await fetch(`http://localhost:5050/records/${id}`, {
            method: "DELETE",
        });
        setRecords(records.filter((record) => record._id !== id));
    }

    return (
        <div className="container mt-5">
            
            <div class="banner"></div>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Lista de Registros</h3>
                <Link to="/create" className="btn btn-success">
                    + Novo Registro
                </Link>
            </div>

            <div className="card shadow p-3">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Nível</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 ? (
                            records.map((record) => (
                                <Record
                                    record={record}
                                    deleteRecord={deleteRecord}
                                    key={record._id}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
