import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = ({ record, deleteRecord }) => (
    <tr>
        <td>{record.name}</td>
        <td>{record.position}</td>
        <td>
            <span className={`badge bg-${getLevelColor(record.level)}`}>
                {record.level}
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

function getLevelColor(level) {
    switch (level) {
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
            <h3 className="mb-4">Lista de Registros</h3>
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
