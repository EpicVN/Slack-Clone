import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog';

interface ThumbnailProps {
  url: string | null | undefined;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] max-h-[420px] border rounded-lg my-2 cursor-zoom-in">
          <img
            src={url}
            alt="Message image"
            className="rounded-md  object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="border-none bg-transparent shadow-none">
        <img
          src={url}
          alt="Message image"
          className="rounded-md  object-cover size-full"
        />
      </DialogContent>
    </Dialog>
  );
};
