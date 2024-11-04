import { ArrowRightCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import useHooks from "./hooks";

function App() {
  const { } = useHooks();

  // This is a simple example of a UI from ShadCN
  // https://ui.shadcn.com/blocks
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello world</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default App;
