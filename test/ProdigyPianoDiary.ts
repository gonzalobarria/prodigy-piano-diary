import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { assert } from 'chai';
import { ethers } from 'hardhat';

describe('ProdigyPianoDiary', function () {
  async function deployBlog() {
    const [owner, account1, account2] = await ethers.getSigners();

    const ProdigyPianoDiary = await ethers.getContractFactory(
      'ProdigyPianoDiary'
    );

    const ppd = await ProdigyPianoDiary.deploy();

    return { ppd, owner, account1, account2 };
  }

  describe('Basic Test', () => {
    it('Add Composer', async () => {
      const { ppd } = await loadFixture(deployBlog);
      const nameComposer = 'Ludwig Van Beethoven';

      await ppd.addComposer(nameComposer, '2017-05-02');
      const composers = await ppd.getComposers();

      assert.equal(composers[0].name, nameComposer);

      const composer = await ppd.getComposer(0);

      assert.equal(composer.name, nameComposer);
    });

    it('Add User', async () => {
      const { ppd } = await loadFixture(deployBlog);
      const userName = 'Waleska Cerpa';

      await ppd.addUser(userName, 2);
      const users = await ppd.getUsers();

      assert.equal(users[0].name, userName);

      const user = await ppd.getUser(0);

      assert.equal(user.name, userName);
    });

    it('Add Sheet', async () => {
      const { ppd } = await loadFixture(deployBlog);
      const sheetName = 'Canon en re mayor';

      const nameComposer = 'Ludwig Van Beethoven';

      await ppd.addComposer(nameComposer, '2017-05-02');

      const userName = 'Waleska Cerpa';

      await ppd.addUser(userName, 2);
      const users = await ppd.getUsers();

      assert.equal(users[0].name, userName);

      const user = await ppd.getUser(0);

      assert.equal(user.name, userName);

      await ppd.addSheet(sheetName, 0, 0, 2, '');
      const sheets = await ppd.getSheets();

      assert.equal(sheets[0].name, sheetName);
      const sheet = await ppd.getSheet(0);

      assert.equal(sheet.name, sheetName);

      const cs = await ppd.getComposerSheets(0);
      const us = await ppd.getUserSheets(0);


    });

    it('Add Sheet to User', async () => {
      const { ppd, account1 } = await loadFixture(deployBlog);

      // add composer
      const sheetName = 'Canon en re mayor';

      const nameComposer = 'Ludwig Van Beethoven';

      await ppd.addComposer(nameComposer, '2017-05-02');

      // add user
      const userName = 'Waleska Cerpa';

      await ppd.addUser(userName, 2);
      const users = await ppd.getUsers();

      assert.equal(users[0].name, userName);

      // add sheet
      await ppd.addSheet(sheetName, 0, 0, 2, '');
      const sheets = await ppd.getSheets();

      assert.equal(sheets[0].name, sheetName);
    });

    it('Add a Register of Study', async () => {
      const { ppd, account1 } = await loadFixture(deployBlog);

      // add composer
      const sheetName = 'Canon en re mayor';

      const nameComposer = 'Ludwig Van Beethoven';

      await ppd.addComposer(nameComposer, '2017-05-02');

      // add user
      const userName = 'Waleska Cerpa';

      await ppd.addUser(userName, 2);
      const users = await ppd.getUsers();

      assert.equal(users[0].name, userName);

      // add sheet
      await ppd.addSheet(sheetName, 0, 0, 2, '');
      const sheets = await ppd.getSheets();

      assert.equal(sheets[0].name, sheetName);

      // add a register
      await ppd.addRecord(0, 0, 1, 2, 20, 1, 1, false);

      const records = await ppd.getRecordsBySheet(0, 0);

      assert.equal(records.length, 1);
      assert.equal(parseInt(records[0].qtyMinutes.toString()), 20);
    });
  });
});
