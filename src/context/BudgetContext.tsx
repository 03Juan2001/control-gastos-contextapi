import { useReducer, type Dispatch } from "react";
import {
    budgetReducer,
    initialState,
    type BudgetActions,
} from "./../reducers/budget-reducer";
import { BudgetContext } from "./BudgetContextDef";

type BudgetProviderProps = {
    children: React.ReactNode;
};

type BudgetProviderState = {
    state: typeof initialState;
    dispatch: Dispatch<BudgetActions>;
};

/*
 * Componente proveedor del contexto de presupuesto.
 * Utiliza un reducer para manejar el estado del presupuesto y proporciona
 * el estado y la función dispatch a través del contexto.
 */
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    // useReducer para manejar el estado del presupuesto
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    return (
        // Brindar el estado y el dispatch a los componentes hijos
        // as React.ContextType<typeof BudgetContext> para evitar error de tipo con TypeScript
        <BudgetContext.Provider
            value={
                { state, dispatch } as BudgetProviderState
            }
        >
            {children}
        </BudgetContext.Provider>
    );
};
