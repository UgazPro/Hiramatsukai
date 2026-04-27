import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  whatsDeleting: string;
  onConfirm: () => void;
  buttonStyles?: string;
  buttonText?: string;
  buttonType?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "clickRed" | null;
  preposition?: string;
}

export function DeleteDialog({ whatsDeleting, onConfirm, buttonStyles, buttonText, buttonType, preposition }: DeleteDialogProps) {
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
            Esta acción eliminará {preposition} <b>{whatsDeleting}</b> permanentemente.
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
