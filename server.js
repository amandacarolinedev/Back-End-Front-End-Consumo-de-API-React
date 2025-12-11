import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user.js';

const app = express();
app.use(express.json());
app.use(cors());

// ====================== CONEXÃO COM MONGO ======================
mongoose
  .connect("mongodb+srv://mandscaroline_db_user:Cuf132132@users.dkkkk0a.mongodb.net/meubanco?retryWrites=true&w=majority&appName=Users")
  .then(() => console.log("Conectado ao MongoDB Atlas"))
  .catch(err => console.error("Erro ao conectar:", err));

// ====================== ROTAS ======================

// Criar usuário
app.post('/usuarios', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualizar usuário pelo ID
app.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const usuarioAtualizado = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!usuarioAtualizado) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar usuário pelo ID
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioDeletado = await User.findByIdAndDelete(id);

    if (!usuarioDeletado) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota inicial opcional
app.get('/', (req, res) => {
  res.send("Servidor rodando!");
});

// ====================== SERVIDOR ======================
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

