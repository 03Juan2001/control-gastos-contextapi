import { useMemo } from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import { formatDate } from "../helpers";
import type { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import "react-swipeable-list/dist/styles.css";

type ExpenseDetailsProps = {
    expense: Expense;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
    const { dispatch } = useBudget();

    const categoryInfo = useMemo(
        () => categories.filter((cat) => cat.id === expense.category)[0],
        [expense.category]
    );

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() =>
                    dispatch({
                        type: "get-expense-by-id",
                        payload: { id: expense.id },
                    })
                }
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() =>
                    dispatch({
                        type: "remove-expense",
                        payload: { id: expense.id },
                    })
                }
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex items-center gap-4">
                    <div>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="Icono Gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-3">
                        <p className="text-sm font-bold uppercase text-slate-500">
                            {categoryInfo.name}
                        </p>
                        <p className="text-lg font-semibold">
                            {expense.expenseName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatDate(expense.date!.toString())}
                            {/* Asegúrate de formatear la fecha según tus necesidades */}
                        </p>
                    </div>

                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
