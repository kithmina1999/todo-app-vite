import { Button, Checkbox, Table } from "antd";
import React from "react";
import { FieldType } from "../App";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


type DataTableProps = {
    tasks: FieldType[]
    onEdit: (task: FieldType) => void
    onDelete: (task: FieldType) => void
    toggleCompletion: (taskId: string) => void
};

const columns = (onEdit: (task: FieldType) => void, onDelete: (task: FieldType) => void, toggleCompletion: (taskId: string) => void) => [
    {
        title: '',
        dataIndex: '',
        key: 'task',
        width: '5%',
        render: (_:boolean, record:FieldType) => (
            <>
                <Checkbox 
                checked={record.completed} 
                onChange={()=> toggleCompletion(record.id)}
                />
            </>
        )
    },
    {
        title: 'Task name',
        dataIndex: 'task',
        key: 'task',
        width: '30%'
    },
    {
        title: 'Task description',
        dataIndex: 'description',
        key: 'description',
        width: '60%'

    },
    {
        title: '',
        dataIndex: '',
        key: 'actions',
        width: '10%',
        render: (_: unknown, record: FieldType) => (
            <div className="flex flex-col lg:flex-row gap-1">
                <Button onClick={() => onEdit(record)} type="primary" size="small" className="mr-2">

                    <FaEdit className="h-4 w-4" />
                </Button>
                <Button onClick={() => onDelete(record)} type="primary" size="small" className="bg-red-500 hover:bg-red-500/80">

                    <MdDelete className="h-4 w-4" />
                </Button>
            </div>
        ),
    }
];

const DataTable: React.FC<DataTableProps> = ({ tasks, onEdit, onDelete, toggleCompletion }) => {
    return (
        <div>
            <Table
                dataSource={tasks}
                columns={columns(onEdit, onDelete, toggleCompletion)}
                rowKey="id"
                rowClassName={(record)=>(record.completed ? 'bg-emerald-500/50 text-white line-through hover:text-black':'')}
            />
        </div>
    )
}

export default DataTable