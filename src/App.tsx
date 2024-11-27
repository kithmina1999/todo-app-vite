import { Space, Button, Form, Input, Checkbox } from 'antd';
import type { FormProps } from 'antd';
import { useEffect, useState } from 'react';
import DataTable from './components/DataTable';

export type FieldType = {
  id: string
  task: string
  description: string
  completed: boolean
  priority: boolean
};

const { TextArea } = Input;

function App() {

  const [form] = Form.useForm()

  const [tasks, setTasks] = useState<FieldType[]>([]);
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
  };

  const onEdit = (task: FieldType) => {
    form.setFieldsValue({
      task: task.task,
      description: task.description,
    });
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
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


  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  console.log(tasks)
  return (
    <main className='px-4 lg:px-0'>
      <div className="min-h-screen mx-auto container">
        <div className=" my-12">
          <h1 className="text-5xl font-bold text-center lg:text-start">Todo App</h1>
        </div>

        <Space className=' w-full  py-1 flex justify-center lg:justify-start'>
          <Form
            className='w-[50vw]'
            form={form}
            name='basic'
            labelCol={{ span: 25 }}
            wrapperCol={{ span: 55 }}
            style={{ width: '60vw' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >

            <Form.Item<FieldType>
              label="Task Name"
              name="task"
              rules={[{ required: true, message: 'Enter your task name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Task Description"
              name="description"
              rules={[{ required: true, message: 'Enter your task descripiton' }]}
            >
              <TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
            </Form.Item>

            <Form.Item<FieldType>
              label='Prioritize
'             name='priority'
              valuePropName='checked'
            >
              <Checkbox>
                Prioritize this task
              </Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>

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
          <DataTable tasks={filteredTasks} onDelete={onDelete} onEdit={onEdit} toggleCompletion={toggleCompletion} />


        </div>
      </div>
    </main>
  )
}

export default App
