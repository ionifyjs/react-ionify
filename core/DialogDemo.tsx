import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
export const DialogDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p>Dialog Demo:</p>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button>Open Dialog</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>This is a description of the dialog.</Dialog.Description>
            <Dialog.Close asChild>
              <button onClick={() => setOpen(false)}>Close</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
