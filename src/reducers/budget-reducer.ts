// Sirve para definir las acciones y el estado del presupuesto
export type BudgetActions =
    | { type: "add-budget"; payload: { budget: number } }
    | { type: "show-modal" }
    | { type: "close-modal" };

// Estado del presupuesto
export type BudgetState = {
    budget: number;
    modal: boolean;
};

// Estado inicial del presupuesto
export const initialState: BudgetState = {
    budget: 0,
    modal: false,
};

// Función reductora para manejar las acciones del presupuesto
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    // Si la acción es para agregar un presupuesto
    if (action.type === "add-budget") {
        return {
            ...state, // copia el estado actual
            budget: action.payload.budget, // actualiza el presupuesto
        };
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: !state.modal,
        };
    }

    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false,
        };
    }
};
