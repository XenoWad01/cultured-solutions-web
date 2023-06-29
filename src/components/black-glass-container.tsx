import { cx } from "@/utils/cx"


export const BlackGlassContainer = ({ children }) => {
  return <div className={cx(
      'absolute',
      'top-1/3 right-96',
      'w-192 h-96',
      'p-12',
      'rounded-3xl', 
      'bg-opacity-30',
      'text-main',
      'darkglassgradient'
      )}>
          {children}
  </div>
}