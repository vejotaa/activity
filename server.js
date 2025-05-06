import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js";


dotenv.config();

const app = express();
const port = process.env.port || 4000;

//midleware
app.use(express.json());

connectToDB();

// ToDo APIs

app.get("/todos", async (req, res) => {
    try {
        const result = await Todo.find()
        res.send({
            sucess: true,
            message: "ToDo retrieved!",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.send({
            sucess: false,
            message: "ToDo failed to be retrieved!",
            data: result,
        })
    }
});

app.post("/create-todo", async (req, res) => {
    const todoDetails = req.body;
    try {
        const result = await Todo.create(todoDetails)
        res.send({
            sucess: true,
            message: "Todo created!",
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.send({
            sucess: false,
            message: "Todo not created!",
            data: result,
        });
    }

});

app.get("/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const result = await Todo.findById(todoId)
        res.send({
            sucess: true,
            message: "Retrieved with sucess!",
            data: result,
        })
    } catch (error) {
        console.log(error);
        res.send({
            sucess: false,
            message: "Failed to retrieve!",
            data: result,
        })
    }
})

app.patch("/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    const updatedTodo = req.body;
    try {
        const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
            new: true,
        });
        res.send({
            sucess: true,
            message: "Todo updated successfully!",
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.send({
            sucess: false,
            message: "Failed to update todo!",
            data: result,
        });
    }
})

app.delete("/:todoId", async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.todoId);
        res.send({
            sucess: true,
            message: "Todo deleted!",
            data: null,
        })
    } catch (error) {
        console.log(error);
        res.send({
            sucess: false,
            message: "Failed to delete!",
            data: null, 
        })
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});