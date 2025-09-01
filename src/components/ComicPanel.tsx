import { PropsWithChildren } from 'react'
import { clsx } from 'clsx'

type ComicPanelProps = PropsWithChildren<{
  title?: string
  className?: string
  id?: string
}>

export default function ComicPanel({ title, className, id, children }: ComicPanelProps) {
  return (
    <section id={id} className={clsx('panel grain relative', className)} aria-label={title}>
      {title ? (
        <div className="absolute -top-3 left-3">
          <span className="panel-title select-none">{title}</span>
        </div>
      ) : null}
      <div className="p-6 md:p-8">
        {children}
      </div>
    </section>
  )
}



