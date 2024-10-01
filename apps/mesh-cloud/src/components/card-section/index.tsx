import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardSection({
  children,
  title,
  description,
  footer,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  footer?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">{children}</div>
      </CardContent>
      {footer && (
        <CardFooter className="border-t px-6 py-4">{footer}</CardFooter>
      )}
    </Card>
  );
}
