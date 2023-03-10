import { log } from '@graphprotocol/graph-ts';
import { NewGravatar, UpdatedGravatar } from '../../generated/GravatarRegistry/GravatarRegistry';
import { Gravatar } from '../../generated/schema';

export function handleNewGravatar(event: NewGravatar): void {
  const gravatar = new Gravatar(event.params.id.toHex());
  log.info('assssss', [event.params.id.toHex()]);
  gravatar.owner = event.params.owner;
  gravatar.displayName = event.params.displayName;
  gravatar.imageUrl = event.params.imageUrl;
  gravatar.save();
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  const id = event.params.id.toHex();
  let gravatar = Gravatar.load(id);
  if (gravatar == null) {
    gravatar = new Gravatar(id);
  }
  gravatar.owner = event.params.owner;
  gravatar.displayName = event.params.displayName;
  gravatar.imageUrl = event.params.imageUrl;
  gravatar.save();
}
