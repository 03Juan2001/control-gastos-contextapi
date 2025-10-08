import { useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(),
    });

    const [error, setError] = useState<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const isAmountField = ["amount"].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value,
        });
    };

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value,
        });
    };

    const handleSubmint = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(expense);

        // Validar el formulario
        if (
            Object.values(expense).includes("") ||
            expense.amount <= 0 ||
            expense.date === null
        ) {
            setError("Todos los campos son obligatorios");
            return;
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmint}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4
                border-blue-600 pb-2"
            >
                Nuevo Gasto
            </legend>

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre Gasto:{" "}
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:{" "}
                </label>
                <input
                    type="text"
                    id="amount"
                    placeholder="Añade la cantidad del gasto"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Categoria:{" "}
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    defaultValue=""
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        -- Seleccione --
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Fecha Gasto:{" "}
                </label>
                <DatePicker
                    value={expense.date}
                    className="bg-slate-100 p-2 border-0"
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full text-white p-2 rounded uppercase font-bold hover:bg-blue-700 transition-colors"
                value="Añadir Gasto"
            />
        </form>
    );
}
