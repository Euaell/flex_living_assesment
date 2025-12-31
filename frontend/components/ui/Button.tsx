import * as React from "react"
import { cn } from "@/utils/cn"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
                    {
                        'bg-black text-white hover:bg-black/90 shadow': variant === 'primary',
                        'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
                        'border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900': variant === 'outline',
                        'hover:bg-gray-100 hover:text-gray-900': variant === 'ghost',
                        'h-9 px-4 py-2': size === 'md',
                        'h-8 px-3 text-xs': size === 'sm',
                        'h-10 px-8': size === 'lg',
                        'h-9 w-9': size === 'icon',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
