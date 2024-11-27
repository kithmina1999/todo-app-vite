import { Button, Checkbox, Form, FormInstance, Input, Space } from 'antd'

import { FieldType } from '../App'
import { useEffect } from 'react';

const { TextArea } = Input;

interface AddTaskFormProps {
    onEdit: (values: FieldType) => void
    form: FormInstance<FieldType>
    currentTask: FieldType | null | undefined
}

const EditTaskForm = ({ onEdit, currentTask, form }: AddTaskFormProps) => {



    //set values to form
    useEffect(() => {
        if (currentTask) {
            form.setFieldsValue({
                id: currentTask.id,
                task: currentTask.task,
                description: currentTask.description,
                completed: currentTask.completed,
                priority: currentTask.priority,
            });
        }
    }, [currentTask, form]);

    const handleEdit = (values: FieldType) => {
        if (currentTask) {
            const newValues = { ...values, id: currentTask.id }
            onEdit(newValues)
        }
    }

    return (
        <Space className=' w-full  py-1 flex justify-center'>
            <Form
                className='w-[50vw]'
                form={form}
                name='basic'
                labelCol={{ span: 25 }}
                wrapperCol={{ span: 55 }}
                style={{ width: '60vw' }}
                initialValues={{
                    id: currentTask?.id,
                    task: currentTask?.task,        // Set initial values based on currentTask
                    description: currentTask?.description,
                    priority: currentTask?.priority,
                }}
                onFinish={handleEdit}
                onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
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
    )
}

export default EditTaskForm