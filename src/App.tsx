import { useEffect, useMemo } from "react";

import { useBudget } from "./hooks/useBudget.ts";
import BudgetForm from "./components/BudgetForm.tsx";
import BudgetTracker from "./components/BudgetTracker.tsx";
import ExpenseModal from "./components/ExpenseModal.tsx";
import ExpenseList from "./components/ExpenseList.tsx";

function App() {
    const { state } = useBudget();

    const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

    useEffect(() => {
        localStorage.setItem("budget", state.budget.toString());
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
    }, [state]);

    return (
        <>
            <header className="bg-blue-600 py-8 max-h-72">
                <h1 className="uppercase text-white text-4xl text-center font-black">
                    Planificador de Gastos
                </h1>
            </header>

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-l mt-10 p-10">
                {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
            </div>

            {isValidBudget && (
                <main className="max-w-3xl mx-auto mt-10">
                    <ExpenseList />
                    <ExpenseModal />
                </main>
            )}
        </>
    );
}

export default App;
