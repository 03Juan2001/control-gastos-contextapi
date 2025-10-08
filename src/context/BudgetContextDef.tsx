import { createContext, type Dispatch } from "react";
import type { BudgetActions, BudgetState } from "../reducers/budget-reducer";

/**
 * Contexto para el presupuesto y el dispatch de acciones.
 * Proporciona el estado actual del presupuesto y una función para actualizarlo.
 * 
 * @property {BudgetState} state - El estado actual del presupuesto.
 * @property {Dispatch<BudgetActions>} dispatch - Función para despachar acciones que modifican el estado del presupuesto.
 * 
 * Separemos el BudgetContext en su propio archivo para evitar problemas de dependencias circulares.
 * Esto mejora la organización del código y facilita el mantenimiento.
 */

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);
