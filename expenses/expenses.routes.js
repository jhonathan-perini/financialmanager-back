import app, {requireAuth} from "../app.js";
import {Router} from "express";
import {createExpense, deleteExpense, getAllExpenses, getSumExpenses, updateExpense} from "./expenses.controller.js";

//ROTAS CRUD

const expensesRouter = Router()

expensesRouter.route('/expenses').get(getAllExpenses).post(createExpense)
expensesRouter.route('/expenses/:id').patch(updateExpense).delete(deleteExpense)
expensesRouter.route('/expenses/category').get(getSumExpenses)


export default expensesRouter