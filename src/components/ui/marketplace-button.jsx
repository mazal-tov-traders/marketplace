import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const marketplaceButtonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        green: "btn-green",
        black: "btn-black",
      },
      size: {
        default: "btn-default",
        sm: "btn-sm",
        lg: "btn-lg",
        icon: "btn-icon",
      },
    },
    defaultVariants: {
      variant: "green",
      size: "default",
    },
  }
)

const MarketplaceButton = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(marketplaceButtonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
MarketplaceButton.displayName = "MarketplaceButton"

export { MarketplaceButton, marketplaceButtonVariants }
