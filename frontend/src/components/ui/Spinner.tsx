
type SpinnerProps = {
  size: "lg" | "xl"
}

export default function Spinner({ size }: SpinnerProps) {
  return (
    <span className={`loading loading-dots loading-${size}`}></span>
  )
}