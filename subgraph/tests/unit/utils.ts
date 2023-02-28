import {
  Address, ethereum, JSONValue, Value, ipfs, json,
} from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';

import { Gravatar } from '../../generated/schema';
import { NewGravatar, GravatarRegistry } from '../../generated/GravatarRegistry/GravatarRegistry';
import { handleNewGravatar } from '../../src/mappings/gravatar';

export function handleNewGravatars(events: NewGravatar[]): void {
  events.forEach((event) => {
    handleNewGravatar(event);
  });
}

const contractAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
const contract = GravatarRegistry.bind(contractAddress);

export function saveGravatarFromContract(gravatarId: string): void {
  const contractGravatar = contract.getGravatar(contractAddress);

  const gravatar = new Gravatar(gravatarId);
  gravatar.displayName = contractGravatar.value0;
  gravatar.imageUrl = contractGravatar.value1;
  gravatar.owner = contractAddress;
  gravatar.save();
}

export function trySaveGravatarFromContract(gravatarId: string): void {
  const contractGravatar = contract.try_getGravatar(contractAddress);

  if (!contractGravatar.reverted) {
    const gravatar = new Gravatar(gravatarId);
    gravatar.displayName = 'Gravatar 48 new';
    gravatar.imageUrl = 'https://example.com/image48_new.png';
    gravatar.owner = contractAddress;
    gravatar.save();
  }
}

export function createNewGravatarEvent(id: i32, ownerAddress: string, displayName: string, imageUrl: string): NewGravatar {
  const newGravatarEvent = changetype<NewGravatar>(newMockEvent());
  newGravatarEvent.parameters = [];
  const idParam = new ethereum.EventParam('id', ethereum.Value.fromI32(id));
  const addressParam = new ethereum.EventParam('ownderAddress', ethereum.Value.fromAddress(Address.fromString(ownerAddress)));
  const displayNameParam = new ethereum.EventParam('displayName', ethereum.Value.fromString(displayName));
  const imageUrlParam = new ethereum.EventParam('imageUrl', ethereum.Value.fromString(imageUrl));

  newGravatarEvent.parameters.push(idParam);
  newGravatarEvent.parameters.push(addressParam);
  newGravatarEvent.parameters.push(displayNameParam);
  newGravatarEvent.parameters.push(imageUrlParam);

  return newGravatarEvent;
}

export function processGravatar(value: JSONValue, userData: Value): void {
  // See the JSONValue documentation for details on dealing
  // with JSON values
  const obj = value.toObject();
  const id = obj.get('id');
  const owner = obj.get('owner');
  const imageUrl = obj.get('imageUrl');

  if ((id == null) || (imageUrl == null) || (owner == null)) {
    return;
  }

  // Callbacks can also created entities
  const gravatar = new Gravatar(id.toString());
  gravatar.displayName = userData.toString() + id.toString();
  gravatar.imageUrl = imageUrl.toString();
  gravatar.owner = Address.fromString(owner.toString());
  gravatar.save();
}

export function gravatarFromIpfs(): void {
  const rawData = ipfs.cat('ipfsCatFileHash');

  if (rawData) {
    const jsonData = json.fromBytes(rawData).toObject();

    const id = jsonData.get('id');
    const imageUrl = jsonData.get('imageUrl');
    const owner = jsonData.get('owner');

    if ((id == null) || (imageUrl == null) || (owner == null)) {
      return;
    }

    const gravatar = new Gravatar(id.toString());
    gravatar.imageUrl = imageUrl.toString();
    gravatar.owner = Address.fromString(owner.toString());
    gravatar.displayName = `Gravatar ${id.toString()}`;
    gravatar.save();
  }
}
