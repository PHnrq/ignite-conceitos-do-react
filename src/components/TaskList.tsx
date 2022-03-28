import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return 
    //O código acima funciona porque ele está negando um falsy que aqui é o valor: '', a negação de um falsy é True, e sendo o coparador = True o codigo retorna, se houver algum valor no estado a variavel será True e a nagação de True é igual a False, a comparação sendo False o codigo segue adiante.
    const newTask = {
      id: Math.floor(Math.random() * 100),
      title: newTaskTitle,
      isComplete: false,
    }
    //O código acima cria uma nova task com a estrutura determinada no interface Task.
    setTasks([...tasks, newTask])
    //O codigo acima adiciona ao array task o objeto newTask que criamos anteriormente 
    setNewTaskTitle('')
    //O codigo acima reseta o estado do newTaskTitle
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const toggleTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task)
    //O codigo acima cria um map para alterar o isComplete da task selecionada usando um if ternario.
    setTasks(toggleTask)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const removeTask = tasks.filter(task => task.id !== id)
    //O codigo a cima cria um filtro do array tasks retornando um array onde o id dos elementos é diferente do informado

    setTasks(removeTask)
    //Defini um novo estado passando o array filtrado anteriormente
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}