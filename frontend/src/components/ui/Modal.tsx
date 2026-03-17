import { X } from "lucide-react"

type ModalProps = {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ open, title, children, onClose }: ModalProps) {
  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg flex justify-between">
          {title}
          <X className="cursor-pointer" onClick={onClose}></X>
        </h3>     

        <div className="py-4">
          {children}
        </div>     
      </div>

      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}