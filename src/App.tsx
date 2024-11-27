import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import Modal from './components/Modal';
import { useModal } from './hooks/useModal';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';

export type FieldType = {
  id: string
  task: string
  description: string
  completed: boolean
  priority: boolean
};



function App() {
  const [form] = Form.useForm()
  const AddTaskModal = useModal()
  const EditTaskModal = useModal()
  const [tasks, setTasks] = useState<FieldType[]>([]);
  const [currentTask, setCurrentTask] = useState<FieldType | null>();
  const [searchQuery, setSearchQuery] = useState<string>('')

  //for initail data load
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')

    try {
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))

      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  //for save data in localstorage
  useEffect(() => {
    try {
      if (tasks.length > 0) {
        localStorage.setItem('tasks', JSON.stringify(tasks))
      }
    } catch (error) {
      console.log(error)
    }
  }, [tasks])

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setTasks((prevTasks) => [...prevTasks, { ...values, id: new Date().toISOString(), completed: false, priority: values.priority || false }])
    form.resetFields()
    AddTaskModal.closeModal()
  };

  const hadnleEdit = (task: FieldType) => {
    EditTaskModal.openModal()
    setCurrentTask(task)
  }

  const onEdit = (values: FieldType) => {
    //replace task by matching ids
    console.log(values)
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === values.id ? { ...task, ...values } : task
      )
    );

    EditTaskModal.closeModal()
  }

  const onDelete = (task: FieldType) => {
    //need to have a unique field deleting tasks with same name coause problems
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const toggleCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task)
    )
  }

  const filteredTasks = tasks
    .filter((task) => task.task.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => Number(b.priority) - Number(a.priority))


  console.log(tasks)
  return (
    <main className=''>
      <Modal
        title='New task'
        isOpen={AddTaskModal.isOpen}
        onClose={AddTaskModal.closeModal}>
        <AddTaskForm onFinish={onFinish} />
      </Modal>
      <Modal
        title='Edit task'
        isOpen={EditTaskModal.isOpen}
        onClose={EditTaskModal.closeModal}>
        <EditTaskForm onEdit={onEdit} form={form} currentTask={currentTask} />
      </Modal>
      <div className="min-h-screen mx-auto container">

        <div className=" my-12 flex justify-between items-center">
          <h1 className="text-5xl font-bold text-center lg:text-start">Todo App</h1>
          <Button type='primary' onClick={AddTaskModal.openModal}>
            Add Task
          </Button>
        </div>



        <div className='my-20'>
          <h1 className='text-3xl font-semibold text-center lg:text-start'>
            Tasks list
          </h1>
          {/* Search Bar */}
          <div className="my-6 flex justify-center">
            <Input.Search
              placeholder="Search by task name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
              style={{ width: '300px' }}
            />
          </div>
          <DataTable tasks={filteredTasks} onDelete={onDelete} onEdit={hadnleEdit} toggleCompletion={toggleCompletion} />


        </div>
      </div>
    </main>
  )
}

export default App
