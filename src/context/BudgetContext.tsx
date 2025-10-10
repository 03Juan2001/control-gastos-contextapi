import { useMemo, useReducer } from "react";
import { budgetReducer, initialState } from "./../reducers/budget-reducer";
import { BudgetContext, type BudgetContextProps } from "./BudgetContextDef";

type BudgetProviderProps = {
    children: React.ReactNode;
};

/*
 * Componente proveedor del contexto de presupuesto.
 * Utiliza un reducer para manejar el estado del presupuesto y proporciona
 * el estado y la función dispatch a través del contexto.
 */
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    // useReducer para manejar el estado del presupuesto
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const totalExpense = useMemo(() => {
        return state!.expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );
    }, [state]);

    const remainingBudget = state!.budget - totalExpense;

    return (
        // Brindar el estado y el dispatch a los componentes hijos
        // as React.ContextType<typeof BudgetContext> para evitar error de tipo con TypeScript
        <BudgetContext.Provider
            value={
                {
                    state,
                    dispatch,
                    totalExpense,
                    remainingBudget,
                } as BudgetContextProps
            }
        >
            {children}
        </BudgetContext.Provider>
    );
};
