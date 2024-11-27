import { Card } from "antd"
import React from "react"

interface ModalProps {
    title: string
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}
const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {

    if (!isOpen) return null
    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-slate-900/70 fixed inset-0 z-[99]">
            <Card
                className="w-[70vw]"
                title={title}
                extra={<button onClick={onClose} className="text-red-500">X</button>}
            >
                {children}
            </Card>
        </div>
    )
}

export default Modal