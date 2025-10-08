import { useReducer, createContext, type Dispatch} from "react";
import {
    budgetReducer,
    initialState,
    type BudgetState,
    type BudgetActions,
} from "./../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState | undefined;
    dispatch: Dispatch<BudgetActions>;
};

type BudgetProviderProps = {
    children: React.ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children } : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    return (
        <BudgetContext.Provider value={{ state, dispatch }}>
            {children}
        </BudgetContext.Provider>
    );
};
