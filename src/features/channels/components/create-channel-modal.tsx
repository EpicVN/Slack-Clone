import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useCreateChannel } from '../api/use-create-channel';
import { useCreateChannelModal } from '../store/use-create-channel-modal';
import { toast } from 'sonner';

export const CreateChannelModal = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [open, setOpen] = useCreateChannelModal();
  const { mutate, isPending } = useCreateChannel();

  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '-').toLowerCase();
    setName(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    mutate(
      { name, workspaceId },
      {
        onSuccess: (id) => {
          toast.success("Channel created successfully")
          router.push(`/workspace/${workspaceId}/channel/${id}`);
          handleClose();
        },
        onError: (error) => {
          console.log("Error creating channel:", error);
          toast.error("Failed to create channel")
        }
      },
    );
  };

  const handleClose = () => {
    setName('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            disabled={isPending}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g. welcome, rules, workspace-news"
          />

          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
