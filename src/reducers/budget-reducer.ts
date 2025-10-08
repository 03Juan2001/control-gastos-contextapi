// Sirve para definir las acciones y el estado del presupuesto
export type BudgetActions = { type: "add-budget"; payload: { budget: number } };

// Estado del presupuesto
export type BudgetState = {
    budget: number;
};

// Estado inicial del presupuesto
export const initialState: BudgetState = {
    budget: 0,
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
};
