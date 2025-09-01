import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Variant = 'left' | 'right' | 'think';

type SpeechBubbleProps = PropsWithChildren<{
  variant?: Variant
  className?: string
  role?: string
}>

export default function SpeechBubble({ variant = 'left', className, role = 'note', children }: SpeechBubbleProps) {
  const variantClass =
    variant === 'left' ? 'bubble bubble-left' : variant === 'right' ? 'bubble bubble-right' : 'bubble bubble-think'
  return (
    <div aria-label="speech" role={role} className={clsx(variantClass, 'grain', className)}>
      {children}
    </div>
  )
}



