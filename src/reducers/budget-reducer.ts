import { v4 as uuidv4 } from "uuid";
import type { DraftExpense, Expense } from "../types";

// Sirve para definir las acciones y el estado del presupuesto
export type BudgetActions =
    | { type: "add-budget"; payload: { budget: number } }
    | { type: "show-modal" }
    | { type: "close-modal" }
    | { type: "add-expense"; payload: { expense: DraftExpense } }
    | { type: "remove-expense"; payload: { id: string } }
    | { type: "get-expense-by-id"; payload: { id: string } }
    | { type: "update-expense"; payload: { expense: Expense } };

// Estado del presupuesto
export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingId: Expense["id"];
};

// Estado inicial del presupuesto
export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: "",
};

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem("budget");
    return localStorageBudget ? +localStorageBudget : 0;
};

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem("expenses");
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

// Función para crear un nuevo gasto con un ID único
const createExpense = (DraftExpense: DraftExpense): Expense => {
    return {
        id: uuidv4(),
        ...DraftExpense,
    };
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
            editingId: "",
        };
    }

    if (action.type === "add-expense") {
        const expense = createExpense(action.payload.expense);
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false,
        };
    }

    if (action.type === "remove-expense") {
        return {
            ...state,
            expenses: state.expenses.filter(
                (expense) => expense.id !== action.payload.id
            ),
        };
    }

    if (action.type === "get-expense-by-id") {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true,
        };
    }

    if (action.type === "update-expense") {
        return {
            ...state,
            expenses: state.expenses.map((expense) =>
                expense.id === action.payload.expense.id
                    ? action.payload.expense
                    : expense
            ),
            editingId: "",
            modal: false,
        };
    }
};
