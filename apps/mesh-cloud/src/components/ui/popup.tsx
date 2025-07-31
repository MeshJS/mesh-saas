import { Logo } from "@/components/layouts/logo";
import { Button } from "@/components/ui/button";
import { Overlay, OverlayInteractive } from "@/components/ui/overlay";
import { Cross1Icon } from "@radix-ui/react-icons";

export interface MessagePopupProps {
  title: string;
  content?: string;
  onClose: () => void;
  onAction1?: () => void;
  action1Icon?: React.ReactNode;
  action1Text?: string;
  onAction2?: () => void;
  action2Icon?: React.ReactNode;
  action2Text?: string;
}

export const MessagePopup = ({
  title,
  content,
  onClose,
  onAction1,
  action1Icon,
  action1Text = "Confirm",
  onAction2,
  action2Icon,
  action2Text,
}: MessagePopupProps) => {
  if (!onAction1) {
    onAction1 = () => onClose();
  }

  return (
    <Overlay>
      <OverlayInteractive />
      <div className="text-navigation-1 border-gradient-primary relative flex flex-col gap-8 rounded-sm border-[2px] bg-accent px-12 py-6">
        <div className="flex w-full items-center justify-between gap-2">
          <Logo />

          <button className="btn h-6 w-6" onClick={onClose}>
            <Cross1Icon width={24} height={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-title-1 text-center">{title}</div>
          <div className="text-body-2 text-center">{content}</div>
        </div>
        <div className="flex justify-center gap-4">
          {onAction1 && action1Text && (
            <Button onClick={onAction1} className="flex gap-1">
              {action1Icon}
              {action1Text}
            </Button>
          )}
          {onAction2 && action2Text && (
            <Button onClick={onAction2} className="flex gap-1">
              {action2Icon}
              {action2Text}
            </Button>
          )}
        </div>
      </div>
    </Overlay>
  );
};
