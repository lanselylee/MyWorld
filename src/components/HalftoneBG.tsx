import { CSSProperties, PropsWithChildren } from 'react'
import { clsx } from 'clsx'

type HalftoneBGProps = PropsWithChildren<{
  density?: number // 0..1 controls intensity of dots
  opacity?: number // 0..1 overall opacity
  className?: string
}>

export default function HalftoneBG({ density = 0.12, opacity = 1, className, children }: HalftoneBGProps) {
  const style = {
    '--dot-opacity': String(Math.max(0, Math.min(1, opacity))),
  } as CSSProperties

  const scale = Math.max(4, Math.round(12 - density * 8))

  return (
    <div className={clsx('relative paper-texture', className)} style={style}>
      <div
        aria-hidden
        className="absolute inset-0 dot-bg"
        style={{ opacity: opacity, backgroundSize: `${scale}px ${scale}px` }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  )
}



