import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  studentName: string;
  onConfirm: () => void;
  buttonStyles?: string;
  buttonText?: string;
  buttonType?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "clickRed" | null;
}

export function DeleteStudentDialog({ studentName, onConfirm, buttonStyles, buttonText, buttonType }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={buttonType ? buttonType : 'ghost'}
          size="sm"
          onClick={(e) => e.stopPropagation()}
          className={buttonStyles}
        >
          <Trash2 />
          {buttonText}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Eliminar estudiante?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Esta acción eliminará a <b>{studentName}</b> permanentemente.
            No se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
