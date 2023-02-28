import {
  assert, createMockedFunction, clearStore, test, newMockEvent, countEntities, mockIpfsFile, beforeAll, describe, afterEach, afterAll,
} from 'matchstick-as/assembly/index';
import {
  Address, BigInt, Bytes, ethereum, store, Value, ipfs,
} from '@graphprotocol/graph-ts';

import {
  handleNewGravatars, createNewGravatarEvent, trySaveGravatarFromContract, saveGravatarFromContract, gravatarFromIpfs,
} from './utils';
import { Gravatar } from '../../generated/schema';
import { GravatarRegistry, NewGravatar } from '../../generated/GravatarRegistry/GravatarRegistry';
import { handleNewGravatar } from '../../src/mappings/gravatar';

// Coverage
export { handleNewGravatar };

// IPFS
export { processGravatar } from './utils';

const GRAVATAR_ENTITY_TYPE = 'Gravatar';

test('Should throw an error', () => {
  throw new Error();
}, true);

describe('Mock contract functions', () => {
  afterAll(() => {
    clearStore();
  });

  test('Can mock and call function with different argument types', () => {
    const numValue = ethereum.Value.fromI32(152);
    const stringValue = ethereum.Value.fromString('example string value');
    const arrayValue = ethereum.Value.fromI32Array([156666, 123412]);
    const booleanValue = ethereum.Value.fromBoolean(true);
    const objectValue = ethereum.Value.fromAddress(Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'));
    const tupleArray: ethereum.Value[] = [ethereum.Value.fromI32(152), ethereum.Value.fromString('string value')];
    const tuple = changetype<ethereum.Tuple>(tupleArray);
    const tupleValue = ethereum.Value.fromTuple(tuple);

    const argsArray: ethereum.Value[] = [numValue, stringValue, arrayValue, booleanValue, objectValue, tupleValue];
    createMockedFunction(Address.fromString('0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947'), 'funcName', 'funcName(int32, string, int32[], bool, address, (int32, string)):(void)')
      .withArgs(argsArray)
      .returns([ethereum.Value.fromString('result')]);
    const val = ethereum.call(new ethereum.SmartContractCall('conName', Address.fromString('0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947'), 'funcName', 'funcName(int32, string, int32[], bool, address, (int32, string)):(void)', argsArray))![0];

    assert.equals(ethereum.Value.fromString('result'), val);
  });

  test('Can test if mocked function reverts', () => {
    createMockedFunction(Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'), 'revertedFunction', 'revertedFunction():(void)').reverts();
    const val = ethereum.call(new ethereum.SmartContractCall('conName', Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'), 'revertedFunction', 'revertedFunction():(void)', []));

    assert.assertNull(val);
  });

  test('Can mock gravatarRegistry function correctly', () => {
    const contractAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const expectedResult = Address.fromString('0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947');
    const bigIntParam = BigInt.fromString('1234');
    createMockedFunction(contractAddress, 'gravatarToOwner', 'gravatarToOwner(uint256):(address)')
      .withArgs([ethereum.Value.fromUnsignedBigInt(bigIntParam)])
      .returns([ethereum.Value.fromAddress(Address.fromString('0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947'))]);

    const gravatarRegistry = GravatarRegistry.bind(contractAddress);
    const result = gravatarRegistry.gravatarToOwner(bigIntParam);

    assert.addressEquals(expectedResult, result);
  });

  describe('Save Gravatar from contract call', () => {
    afterEach(() => {
      clearStore();
    });

    test('Can save Gravatar from contract', () => {
      const contractAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');

      createMockedFunction(contractAddress, 'getGravatar', 'getGravatar(address):(string,string)')
        .withArgs([ethereum.Value.fromAddress(contractAddress)])
        .returns([ethereum.Value.fromString('Gravatar 48'), ethereum.Value.fromString('https://example.com/image48.png')]);

      saveGravatarFromContract('48');

      assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '48', 'displayName', 'Gravatar 48');
      assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '48', 'imageUrl', 'https://example.com/image48.png');
    });

    test('Can fail gracefully when saving gravatar from contract with try_getGravatar', () => {
      const contractAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');

      createMockedFunction(contractAddress, 'getGravatar', 'getGravatar(address):(string,string)')
        .withArgs([ethereum.Value.fromAddress(contractAddress)])
        .reverts();

      trySaveGravatarFromContract('49');
      // Assert that the gravatar was not saved
      assert.notInStore(GRAVATAR_ENTITY_TYPE, '49');
    });
  });
});

describe('Mocked Events', () => {
  afterEach(() => {
    clearStore();
  });

  test('Can call mappings with custom events', () => {
    // Call mappings
    const newGravatarEvent = createNewGravatarEvent(
      0xdead,
      '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
      'Gravatar 0xdead',
      'https://example.com/image0xdead.png',
    );

    const anotherGravatarEvent = createNewGravatarEvent(
      0xbeef,
      '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
      'Gravatar 0xbeef',
      'https://example.com/image0xbeef.png',
    );

    handleNewGravatars([newGravatarEvent, anotherGravatarEvent]);

    assert.entityCount(GRAVATAR_ENTITY_TYPE, 2);
    assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '0xdead', 'displayName', 'Gravatar 0xdead');
    assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '0xbeef', 'displayName', 'Gravatar 0xbeef');
  });

  test('Can initialise event with default metadata', () => {
    const newGravatarEvent = changetype<NewGravatar>(newMockEvent());

    const DEFAULT_LOG_TYPE = 'default_log_type';
    const DEFAULT_ADDRESS = '0xA16081F360e3847006dB660bae1c6d1b2e17eC2A';
    const DEFAULT_BLOCK_HASH = '0xA16081F360e3847006dB660bae1c6d1b2e17eC2A';
    const DEFAULT_LOG_INDEX = 1;

    assert.stringEquals(DEFAULT_LOG_TYPE, newGravatarEvent.logType!);
    assert.addressEquals(Address.fromString(DEFAULT_ADDRESS), newGravatarEvent.address);
    assert.bigIntEquals(BigInt.fromI32(DEFAULT_LOG_INDEX), newGravatarEvent.logIndex);
    assert.bytesEquals(Bytes.fromHexString(DEFAULT_BLOCK_HASH), newGravatarEvent.block.hash);
  });

  test('Can update event metadata', () => {
    const newGravatarEvent = changetype<NewGravatar>(newMockEvent());

    const UPDATED_LOG_TYPE = 'updated_log_type';
    const UPDATED_ADDRESS = '0xB16081F360e3847006dB660bae1c6d1b2e17eC2A';
    const UPDATED_BLOCK_HASH = '0xC16081F360e3847006dB660bae1c6d1b2e17eC2A';
    const UPDATED_LOG_INDEX = 42;

    newGravatarEvent.logType = UPDATED_LOG_TYPE;
    newGravatarEvent.address = Address.fromString(UPDATED_ADDRESS);
    newGravatarEvent.block.hash = Bytes.fromHexString(
      UPDATED_BLOCK_HASH,
    );
    newGravatarEvent.logIndex = BigInt.fromI32(UPDATED_LOG_INDEX);

    assert.stringEquals(UPDATED_LOG_TYPE, newGravatarEvent.logType!);
    assert.addressEquals(Address.fromString(UPDATED_ADDRESS), newGravatarEvent.address);
    assert.bigIntEquals(BigInt.fromI32(UPDATED_LOG_INDEX), newGravatarEvent.logIndex);
    assert.bytesEquals(Bytes.fromHexString(UPDATED_BLOCK_HASH), newGravatarEvent.block.hash);
  });
});

describe('Entity Store', () => {
  beforeAll(() => {
    const gravatar = new Gravatar('gravatarId0');
    gravatar.displayName = 'Gravatar 0';
    gravatar.owner = Address.fromString('0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947');
    gravatar.imageUrl = 'https://example.com/gravatarId0.png';
    gravatar.save();

    const gravatar2 = new Gravatar('23');
    gravatar2.owner = Address.fromString('0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947');
    gravatar2.displayName = 'Gravatar 23';
    gravatar2.imageUrl = 'https://example.com/23.png';
    gravatar2.save();
  });

  afterAll(() => {
    clearStore();
  });

  test('Can use entity.load() to retrieve entity from store', () => {
    const retrievedGravatar = Gravatar.load('gravatarId0');
    assert.assertNotNull(retrievedGravatar);
    if (retrievedGravatar) {
      assert.stringEquals('gravatarId0', retrievedGravatar.get('id')!.toString());
    }
  });

  test("Returns null when calling entity.load() if an entity doesn't exist", () => {
    const retrievedGravatar = Gravatar.load('IDoNotExist');
    assert.assertNull(retrievedGravatar);
  });

  test('Can update entity that already exists using Entity.save()', () => {
    // Retrieve same entity from the store
    const gravatar = Gravatar.load('23') as Gravatar;
    gravatar.set('imageUrl', Value.fromString('https://i.ytimg.com/vi/MELP46s8Cic/maxresdefault.jpg'));
    gravatar.save();

    assert.fieldEquals(
      GRAVATAR_ENTITY_TYPE,
      '23',
      'imageUrl',
      'https://i.ytimg.com/vi/MELP46s8Cic/maxresdefault.jpg',
    );
  });

  test('Can add, get, assert and remove from store', () => {
    assert.fieldEquals(
      GRAVATAR_ENTITY_TYPE,
      '23',
      'id',
      '23',
    );

    store.remove(GRAVATAR_ENTITY_TYPE, '23');
    assert.notInStore(GRAVATAR_ENTITY_TYPE, '23');

    clearStore();
  });

  test('Can assert amount of entities of a certain type in store', () => {
    clearStore();
    assert.entityCount(GRAVATAR_ENTITY_TYPE, 0);

    let counter = 1;
    while (countEntities(GRAVATAR_ENTITY_TYPE) < 2) {
      const newGravatar = new Gravatar(`id${counter.toString()}`);
      newGravatar.displayName = `Gravatar ${counter.toString()}`;
      newGravatar.owner = Address.fromString(`0x000000000000000000000000000000000000000${counter.toString()}`);
      newGravatar.imageUrl = `https://example.com/image${counter.toString()}.png`;
      newGravatar.save();
      counter += 1;
    }

    assert.entityCount(GRAVATAR_ENTITY_TYPE, 2);
  });
});

describe('IPFS', () => {
  beforeAll(() => {
    mockIpfsFile('ipfsCatFileHash', 'tests/unit/ipfs/cat.json');
    mockIpfsFile('ipfsMapFileHash', 'tests/unit/ipfs/map.json');
  });

  afterEach(() => {
    clearStore();
  });

  test('ipfs.cat', () => {
    assert.entityCount(GRAVATAR_ENTITY_TYPE, 0);

    gravatarFromIpfs();

    assert.entityCount(GRAVATAR_ENTITY_TYPE, 1);
    assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '1', 'imageUrl', 'https://example.com/image1.png');
  });

  test('ipfs.map', () => {
    assert.entityCount(GRAVATAR_ENTITY_TYPE, 0);

    ipfs.map('ipfsMapFileHash', 'processGravatar', Value.fromString('Gravatar'), ['json']);

    assert.entityCount(GRAVATAR_ENTITY_TYPE, 3);
    assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '1', 'displayName', 'Gravatar1');
    assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '2', 'displayName', 'Gravatar2');
    assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '3', 'displayName', 'Gravatar3');
  });
});
