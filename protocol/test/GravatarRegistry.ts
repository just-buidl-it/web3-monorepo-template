import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { GravatarRegistry as GravatarRegistryType } from '../typechain-types';

describe('Gravatar', () => {
  async function deployGravatarFixture(): Promise<
    {
      gravatarRegistry: GravatarRegistryType,
      deployer: SignerWithAddress,
      account1: SignerWithAddress
    }
    > {
    const [deployer, account1] = await ethers.getSigners();

    const GravatarRegistry = await ethers.getContractFactory('GravatarRegistry');
    const gravatarRegistry = await GravatarRegistry.deploy();

    return { gravatarRegistry, deployer, account1 };
  }

  describe('createGravatar', () => {
    it('Should create a gravatar for new address', async () => {
      const { gravatarRegistry, account1 } = await loadFixture(deployGravatarFixture);
      const displayName = 'MyGrav';
      const imageUrl = 'https://gateway.ipfs.io/dSHpNA1zGukPKipfs/QmeSYtQ55TvL6ujE4xcMDxn3SMao9mWFg';

      await expect(gravatarRegistry.connect(account1).createGravatar(displayName, imageUrl)).to.emit(gravatarRegistry, 'NewGravatar')
        .withArgs(1, account1.address, displayName, imageUrl);
      expect(await gravatarRegistry.gravatarToOwner(1)).to.be.equal(account1.address);
      expect(await gravatarRegistry.ownerToGravatar(account1.address)).to.be.equal(1);
      const response = await gravatarRegistry.gravatars(0);

      expect(response.owner).to.be.equal(account1.address);
      expect(response.displayName).to.be.equal(displayName);
      expect(response.imageUrl).to.be.equal(imageUrl);
    });

    it('Should throw error if user tries to create second gravatar', async () => {
      const { gravatarRegistry, account1 } = await loadFixture(deployGravatarFixture);

      const displayName = 'MyGrav2';
      const imageUrl = 'https://gateway.ipfs.io/ipfs/Q55TvL6ujE4xcMDxn3SMao9mWFgdSmeSYtQHpNA1zGukPK';
      await gravatarRegistry.connect(account1).createGravatar(displayName, imageUrl);
      await expect(gravatarRegistry.connect(account1).createGravatar(displayName, imageUrl)).to.be.revertedWith(
        'One Gravatar per address allowed',
      );
    });
  });

  describe('getGravatar', () => {
    it('Should get gravatar display name and image url', async () => {
      const { gravatarRegistry, account1 } = await loadFixture(deployGravatarFixture);

      const displayName = 'MyGrav3';
      const imageUrl = 'https://gateway.ipfs.io/ipfs/QmeSYtQ55TvL6ujE4xcMDxn3TvL6ao9mWFgdSHpNA1zGukPK';
      await gravatarRegistry.connect(account1).createGravatar(displayName, imageUrl);
      const response = await gravatarRegistry.connect(account1).getGravatar(account1.address);
      expect(response[0]).to.be.equal(displayName);
      expect(response[1]).to.be.equal(imageUrl);
    });
  });

  describe('updateGravatarName', () => {
    const displayName = 'MyGrav3';
    const imageUrl = 'https://gateway.ipfs.io/ipfs/QmeSYtQ55TvL6ujE4xcMDxn3TvL6ao9mWFgdSHpNA1zGukPK';

    it('Should update the display name', async () => {
      const { gravatarRegistry, account1 } = await loadFixture(deployGravatarFixture);
      const newName = 'MyGravNewName';
      await gravatarRegistry.connect(account1).createGravatar(displayName, imageUrl);
      await expect(gravatarRegistry.connect(account1).updateGravatarName(newName)).to.emit(gravatarRegistry, 'UpdatedGravatar')
        .withArgs(0, account1.address, newName, imageUrl);
      const response = await gravatarRegistry.connect(account1).getGravatar(account1.address);
      expect(response[0]).to.be.equal(newName);
    });

    it('Should throw error if address has no gravatar', async () => {
      const { gravatarRegistry, account1 } = await loadFixture(deployGravatarFixture);
      const newName = 'MyGravNewName';
      await expect(gravatarRegistry.connect(account1).updateGravatarName(newName)).to.be.revertedWith(
        'No gravatar registered for this address',
      );
    });
  });

  describe('updateGravatarImage', () => {
    const displayName = 'MyGrav3';
    const imageUrl = 'https://gateway.ipfs.io/ipfs/QmeSYtQ55TvL6ujE4xcMDxn3TvL6ao9mWFgdSHpNA1zGukPK';

    it('Should allow owner to update Gravatar image ', async () => {
      const { gravatarRegistry, account1 } = await loadFixture(deployGravatarFixture);
      const newUrl = 'https://gateway.ipfs.io/ipfs/A1zGukPKQmeSYtQ55TvL6ujE4xcMDxn3TvL6ao9mWFgdSHpN';
      await gravatarRegistry.connect(account1).createGravatar(displayName, imageUrl);
      await expect(gravatarRegistry.connect(account1).updateGravatarImage(newUrl)).to.emit(gravatarRegistry, 'UpdatedGravatar')
        .withArgs(0, account1.address, displayName, newUrl);
      const response = await gravatarRegistry.connect(account1).getGravatar(account1.address);
      expect(response[1]).to.be.equal(newUrl);
    });

    it('Should throw error if address has no gravatar', async () => {
      const { gravatarRegistry, account1 } = await loadFixture(deployGravatarFixture);
      const newUrl = 'https://gateway.ipfs.io/ipfs/A1zGukPKQmeSYtQ55TvL6ujE4xcMDxn3TvL6ao9mWFgdSHpN';
      await expect(gravatarRegistry.connect(account1).updateGravatarName(newUrl)).to.be.revertedWith(
        'No gravatar registered for this address',
      );
    });
  });
});
