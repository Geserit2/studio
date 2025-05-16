import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
}

export default function IconCard({ icon: Icon, title, description, className, iconClassName }: IconCardProps) {
  return (
    <Card className={`flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <CardHeader>
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className={`h-8 w-8 ${iconClassName}`} />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
