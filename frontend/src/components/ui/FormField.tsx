type FormFieldProps = {
  name: string,
  error: string | undefined,
  children: React.ReactNode
}

export default function Modal({ name, error, children }: FormFieldProps) {
  return (
    <div>
        <label className="label">
          <span className="label-text">{name}</span>
        </label>

        {children}

        {error && (
          <span className="text-error text-sm">
            {error}
          </span>
        )}
    </div>
  )
}