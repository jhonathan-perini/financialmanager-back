import app, {requireAuth} from "../app.js";
import {Router} from "express";
import {createExpense, deleteExpense, getAllExpenses, getSumExpenses, updateExpense} from "./expenses.controller.js";

//ROTAS CRUD

const expensesRouter = Router()

expensesRouter.route('/expenses').get(requireAuth, getAllExpenses).post(requireAuth,createExpense)
expensesRouter.route('/expenses/:id').patch(requireAuth,updateExpense).delete(requireAuth,deleteExpense)
expensesRouter.route('/expenses/category').get(requireAuth,getSumExpenses)


export default expensesRouter