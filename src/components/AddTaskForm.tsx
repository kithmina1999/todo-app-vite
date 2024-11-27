import { Button, Checkbox, Form, Input, Space } from 'antd'

import { FieldType } from '../App'

const { TextArea } = Input;

const AddTaskForm = ({ onFinish }: { 
    onFinish: (values: FieldType) => void
 }) => {

    const [form] = Form.useForm()

    return (
        <Space className=' w-full  py-1 flex justify-center'>
            <Form
                className='w-[50vw]'
                form={form}
                name='basic'
                labelCol={{ span: 25 }}
                wrapperCol={{ span: 55 }}
                style={{ width: '60vw' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
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

export default AddTaskForm