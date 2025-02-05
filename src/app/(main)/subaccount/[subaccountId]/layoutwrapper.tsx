'use client'

import { usePathname } from 'next/navigation'

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  // Define condition for paths where padding should be removed
  const shouldRemovePadding = pathname.includes('/funnels/') && pathname.includes('/editor/')

  return (
    <div className={shouldRemovePadding ? '' : 'md:pl-[300px]'}>
      {children}
    </div>
  )
}

export default LayoutWrapper
