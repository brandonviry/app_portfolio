import { cn } from "@/lib/utils";

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export function InfoItem({ icon, label, className }: InfoItemProps) {
  return (
    <div className={cn(
      "flex items-center gap-2",
      "text-text-secondary",
      className
    )}>
      {icon}
      <span className="text-sm md:text-base font-medium">{label}</span>
    </div>
  );
}
